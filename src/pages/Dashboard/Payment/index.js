import { useState } from 'react';
import FormCreditCard from '../../../components/FormCreditCard';

export default function Payment() {
  const [formData, setFormData] = useState({
    cvc: '',
    expiry: '',
    name: '',
    number: '',
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Faça algo com os dados do formulário completo, incluindo o PaymentForm
    console.log(formData);
  };

  return <FormCreditCard formData={formData} setFormData={setFormData} />;
}
