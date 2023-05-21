
export default function types(ticketType) {
  const amountOfTypes = ticketType.length;
  const valueOfTrueTrue = ticketType.find((e) => e.includesHotel === false && e.isRemote === false);
  const possibilities = [{ id: '', name: 'Presencial', price: 0 }, {}, {}, {}];
  for (let i = 0; i < amountOfTypes; i++) {
    const possibleValues = possibilities[i + 1];
    if (ticketType[i].isRemote === false) {
      if (ticketType[i].includesHotel === false) {
        possibleValues['id'] = ticketType[i].id;
        possibleValues['name'] = 'Sem Hotel';
        possibleValues['price'] = 0;
        possibilities[0].id = ticketType[i].id;
        possibilities[0].name = 'Presencial';
        possibilities[0].price = ticketType[i].price;
      } else {
        possibleValues['id'] = ticketType[i].id;
        possibleValues['name'] = 'Com Hotel';
        possibleValues['price'] = ticketType[i].price - valueOfTrueTrue.price;
      }
    } else {
      possibleValues['id'] = ticketType[i].id;
      possibleValues['name'] = 'Online';
      possibleValues['price'] = ticketType[i].price;
    }
  }
  return possibilities;
}
