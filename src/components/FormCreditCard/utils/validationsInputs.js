export default function validationsInputs(formData) {
  function a(b) {
    return {
      name: 'Error',
      message: b,
    };
  }
  if (formData.issuer === 'unknown') throw new a('Numero de cartão desconhecido!');
  if (
    formData.issuer === '' ||
    formData.cvc === '' ||
    formData.expiry === '' ||
    formData.name === '' ||
    formData.number === ''
  )
    throw new Error('Preencha todos os campos do cartão');
  if (formData.name.split(' ').length !== 2) throw new Error('Isira nome e sobrenome!');
  if (
    Number(formData.expiry.slice(0, 2)) < 1 ||
    Number(formData.expiry.slice(0, 2)) > 12 ||
    Number(formData.expiry.slice(2, 4)) < 1 ||
    Number(formData.expiry.slice(2, 4)) > 80
  )
    throw new Error('Esta data é invalida!');
}
