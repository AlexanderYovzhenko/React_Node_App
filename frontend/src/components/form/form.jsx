import React, { useState }  from 'react';
import './form.css'


function Form(props) {  
  const [ helperCardNumber, setHelperCardNumber ] = useState(null); 
  const [ helperExpirationDate, setHelperExpirationDate ] = useState(null); 
  const [ helperCVV, setHelperCVV ] = useState(null); 
  const [ helperAmount, setAmount ] = useState(null); 

  const [ isValidCardNumber, setIsValidCardNumber ] = useState(false); 
  const [ isValidExpirationDate, setIsValidExpirationDate ] = useState(false); 
  const [ isValidCVV, setIsValidCVV ] = useState(false); 
  const [ isValidCardAmount, setIsValidAmount ] = useState(false); 

  const [ buttonDisable, setButtonDisable ] = useState(true); 

  const [ formData, setFormData ] = useState({});

  const fetchServer = () => {
    fetch('/api', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      return response.json()})
    .then(data => {
      console.log(data);
     return props.setResponseServer({message: data.message, response: data.response});
    
    })
    .catch(err => {
      console.error(err);
    });
  }
  
  const onSubmit = (event) => {
    event.preventDefault();
    formData.CardNumber = event.target.elements[0].value;
    formData.ExpirationDate = event.target.elements[1].value;
    formData.CVV = event.target.elements[2].value;
    formData.Amount = event.target.elements[3].value;
    setFormData(formData);
    event.target.reset()
    fetchServer();  
  }

  const onChange = async (event) => {
    switch (event.target.id) {
      case 'CardNumber':
        if (event.target.value.length === 16) {
          setHelperCardNumber('Card number is valid');
          setIsValidCardNumber(true)
        } else {
          setHelperCardNumber('Card number is invalid');
          setIsValidCardNumber(false)
        } 
        break;
      case 'ExpirationDate':
        if (event.target.value.length === 6 ) {
          setHelperExpirationDate('Card number is valid');
          setIsValidExpirationDate(true);
        } else {
          setHelperExpirationDate('Card number is invalid');
          setIsValidExpirationDate(false);
        }
        break;
      case 'CVV':
        if (event.target.value.length === 3) {
          setHelperCVV('Card number is valid'); 
          setIsValidCVV(true);
        } else {
          setHelperCVV('Card number is invalid');
          setIsValidCVV(false);
        } 
        break;
      case 'Amount':
        if (event.target.value.length >= 2) {
          setAmount('Card number is valid');
          setIsValidAmount(true);
        } else {
          setAmount('Card number is invalid');
          setIsValidAmount(false);
        }
        break;
      default:
        break;
    }
    const arrIsValid = [isValidCardNumber, isValidExpirationDate, isValidCVV, isValidCardAmount];
    if (!arrIsValid.includes(false)) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }

  return (
    <form onChange={onChange} onSubmit={onSubmit}>
        <label htmlFor="CardNumber">Card Number*</label>
        <br />
        <input className='input CardNumber'
          required
          id='CardNumber'
          type="number"
          placeholder="1111-2222-3333-4444"
          onInput = {(e) =>{
            e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,16)
          }}
        />
        <p className='helperText helperTextCard' style={{ color: isValidCardNumber ? 'green' : 'red' }}>{helperCardNumber}</p>
        <br />
        <label htmlFor="ExpirationDate">Expiration Date*</label>
        <br />
        <input className='input ExpirationDate'
          required
          id='ExpirationDate'
          type="number"
          placeholder="mm/yyyy"
          onInput = {(e) =>{
            e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,6)
          }}
        />
        <p className='helperText helperTextCard' style={{ color: isValidExpirationDate ? 'green' : 'red' }}>{helperExpirationDate}</p>
        <br />
        <label htmlFor="CVV">CVV*</label>
        <br />
        <input className='input CVV'
          required
          id='CVV'
          type="number"
          placeholder="123"
          onInput = {(e) =>{
            e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,3)
          }}
        />
        <p className='helperText helperTextCard' style={{ color: isValidCVV ? 'green' : 'red' }}>{helperCVV}</p>
        <br />
        <label htmlFor="Amount">Amount*</label>
        <br />
        <input className='input Amount'
          required   
          id='Amount' 
          type="number"
          placeholder="100"
        />
        <p className='helperText helperExpirationDate' style={{ color: isValidCardAmount ? 'green' : 'red' }}>{helperAmount}</p>
        <br />
        <button className='button ButtonSubmit' type='submit' disabled={buttonDisable}>
          SEND
        </button>
      </form>
  );
}

export default Form;
