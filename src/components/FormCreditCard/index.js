import React, { useEffect, useRef, useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import styled from 'styled-components';

const FormCreditCard = ({ formData, setFormData }) => {
  const { cvc, expiry, name, number } = formData;
  const [focusedField, setFocusedField] = useState('');

  const inputRefs = {
    number: useRef(null),
    name: useRef(null),
    expiry: useRef(null),
    cvc: useRef(null),
  };

  const handleInputFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  useEffect(() => {
    if (focusedField && inputRefs[focusedField].current) {
      inputRefs[focusedField].current.focus();
    }
  }, [focusedField, inputRefs]);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  return (
    <FormCreditCardStyle id="PaymentForm">
      <div className="cardContainer">
        <Cards cvc={cvc} expiry={expiry} focused={focusedField} name={name} number={number} />
      </div>

      <form>
        <div className="containerNumber">
          <input
            ref={inputRefs.number}
            type="tel"
            name="number"
            placeholder="Card Number"
            onChange={onInputChange}
            onFocus={() => handleInputFocus('number')}
            maxLength={16}
            min={0}
          />

          <h1>Ex.: 49..., 51..., 36..., 37...</h1>
        </div>

        <input
          ref={inputRefs.name}
          type="text"
          name="name"
          placeholder="Name"
          onChange={onInputChange}
          onFocus={() => handleInputFocus('name')}
          maxLength={15}
          min={0}
        />

        <div className="containerDoble">
          <input
            ref={inputRefs.expiry}
            type="tel"
            name="expiry"
            placeholder="Valid Thru"
            onChange={onInputChange}
            onFocus={() => handleInputFocus('expiry')}
            maxLength={4}
            min={0}
          />
          <input
            ref={inputRefs.cvc}
            type="tel"
            name="cvc"
            placeholder="CVC"
            onChange={onInputChange}
            onFocus={() => handleInputFocus('cvc')}
            maxLength={3}
            min={0}
            className="cvcInput"
          />
        </div>
      </form>
    </FormCreditCardStyle>
  );
};

export default FormCreditCard;

const FormCreditCardStyle = styled.div`
  display: flex;
  @media (max-width: 910px) {
    display: grid;
    gap: 20px;
  }
  .cardContainer {
    display: grid;
    place-items: center;
  }

  form {
    padding: 10px 10px 10px 20px;
    display: grid;
    gap: 10px;
    max-width: 600px;
    input {
      width: 400px;
      @media (max-width: 910px) {
        width: 100%;
      }
    }
    h1 {
      font-weight: 400;
      color: rgba(0, 0, 0, 0.3);
      font-size: 14px;
      margin-left: 5px;
      margin-top: 5px;
    }

    .containerDoble {
      display: flex;
      gap: 10px;
      max-width: 100%;
      input:nth-child(1) {
        width: 100%;
      }

      .cvcInput {
        max-width: 100px;
      }
    }
  }
`;
