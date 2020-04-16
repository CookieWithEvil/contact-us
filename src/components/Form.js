import React, { Fragment, useState, useRef } from 'react';

import sentImage from '../images/sent.png';
import spinner from '../images/spinner.svg';
import './scss/form.scss';

export default function Form() {
  const buttonRef = useRef(null);
  const [sendStatus, setSendingStatus] = useState(false);//false, 'sending', 'success'

  const [subject, setSubject] = useState();

  const [selected, setSelected] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState();

  const [errorSelected, setErrorSelected] = useState(false);
  const [errorName, setErrorName]  = useState(false);
  const [errorPhone, setErrorPhone]  = useState(false);
  const [errorEmail, setErrorEmail]  = useState(false);

  const validateAll = () => {
    setErrorSelected((selected && selected.length) ? false : 'Specify Subject');
    setErrorName((name && name.length) ? false : 'Enter Your Name');
    setErrorPhone((phone.length === 9) ? false : 'Enter Your Phone');
    let correctEmail = validateEmail(email, true);

    return (selected && selected.length) && (name && name.length) && (phone.length === 9) && correctEmail;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(e.target.id === 'submit'){
      if(!sendStatus){
        let allTrue = validateAll();

        if(allTrue){
          setSendingStatus('sending');
          showMessageSuceed();
        }
      }else if(sendStatus === 'success'){
        setSendingStatus(false);
      }
    }
  }

  const showMessageSuceed = () => {
    setSendingStatus('sending');
    setTimeout(() => {
      setSendingStatus('success');
    }, 2500);
  }

  const validateName = (e) => {
    let name = e.target.value;
    let incorrectName = /[0-9]|[!@#$%^&*(){}[]]/g.test(name)
    setName(name);
    if(errorName){
      setErrorName(!incorrectName ? false : 'Invalid Name');
    }
  }

  const validateTel = (e) => {
     let tel = (e.target.value);

     let filteredPhone = tel.replace(/\D/g, '');
    //  let newPhone = tel.slice(0, 6) + ' ' +
    //                 filteredPhone.slice(0, 2) + ' ' +
    //                 filteredPhone.slice(2, 5) + ' ' +
    //                 filteredPhone.slice(5, 7) + ' ' +
    //                 filteredPhone.slice(7);// +(380) 98 394 49 75
    setPhone(filteredPhone.slice(0, 9));

    if(errorPhone){
      setErrorPhone(filteredPhone.length === 9 ? false : 'Invalid Number')
    }
  }

  const validateEmail = (e, isSubmit) => {
    let email = (typeof e === 'object') ? e.target.value : e;
    let correctEmail = /\S+@\S+\.\S+/.test(email);
    if(errorEmail || isSubmit){
      let emailErrorMassage = !(email && email.length) ? 'Enter Email' : 'Invalid Email';
      setErrorEmail(correctEmail ? false : emailErrorMassage);
    }

    setEmail(email);
    return correctEmail;
  }

  const handleSelect = (e, value) => {
    e.preventDefault();
    setSelected(value);
    setErrorSelected(false);
    buttonRef.current.blur();
  }

  return (
    <form className='contact-form' onClick={(e) => handleSubmit(e)}>
      {sendStatus === 'success' ?
        <div className='success-container'>
          <img src={sentImage} alt='image sent' className='sent-image'/>
          <h2 className='success-title'>We received your <br />message!</h2>
          <secondary>Thanks for contacting us! We will get back to you ASAP</secondary>
        </div>
        :
        <>
          <h2 className='title'>Contact Us</h2>
          <label className='label'>
            <div className='label-text-wrapper'>
              <p className='label-text'>SUBJECT</p>
              {errorSelected && <span className='error-text'>{errorSelected}</span>}
            </div>

            <div className='select'>
              <button className={`form-input ${errorSelected ? 'error' : ''}`} ref={buttonRef}>
                {selected}
                <ul className='form-input options'>
                  <li onClick={(e, valuer) => handleSelect(e, 'Work opportunities')}>Work opportunities</li>
                  <li onClick={(e, valuer) => handleSelect(e, 'Questions about product')}>Questions about product</li>
                  <li onClick={(e, valuer) => handleSelect(e, 'Сooperation')}>Сooperation</li>
                  <li onClick={(e, valuer) => handleSelect(e, 'Other')}>Other</li>
                </ul>
              </button>

            </div>

          </label>

          <label className='label'>
            <div className='label-text-wrapper'>
              <p className='label-text'>NAME</p>
              {errorName && <span className='error-text'>{errorName}</span>}
            </div>
            <input
              value={name}
              name='name'
              className={`form-input ${errorName ? 'error' : ''}`}
              onChange={(e) => validateName(e)}/>
          </label>

          <label className='label'>
            <div className='label-text-wrapper'>
              <p className='label-text'>PHONE NUMBER</p>
              {errorPhone && <span className='error-text'>{errorPhone}</span>}
            </div>
            <input
              type='tel'
              value={phone}
              className={`form-input ${errorPhone ? 'error' : ''}`}
              onChange={(e) => validateTel(e)}
              />
          </label>

          <label className='label'>
          <div className='label-text-wrapper'>
            <p className='label-text'>EMAIL</p>
            {errorEmail && <span className='error-text'>{errorEmail}</span>}
          </div>
            <input
              type='email'
              value={email}
              className={`form-input ${errorEmail ? 'error' : ''}`}
              onChange={(e) => validateEmail(e)} />
          </label>

          <label className='label'>
            <div className='label-text-wrapper'>
              <p className='label-text'>MESSAGE</p>
            </div>

            <textarea className='form-input textarea' />
          </label>
        </>
      }

      <button
        type='submit'
        id='submit'
        className={`form-input submit-button ${(sendStatus === 'success') ? 'success' : ''}`}
        onClick={(e) => handleSubmit(e)}
       >
       {!sendStatus && 'Send'}
       {sendStatus === 'sending' && <img src={spinner} alt='sending' className='spinner-icon' />}
       {sendStatus === 'success' && 'Great!'}
      </button>
    </form>
  );
}
