import React, { useState } from 'react';

import Form from './components/Form';

import './scss/styles.scss';
import menuIcon from './images/menu-icon.png';
import closeIcon from './images/close-icon.png';
import logo from './images/logo.png';
import map from './images/map.png';

function App() {
  const [mobileMenu, toggleMobileMenu] = useState(false);

  return (
    <div className=''>
      <header className='header'>
        <img src={logo} alt='logo' />
        <button className='mobile-menu-icon' onClick={() => toggleMobileMenu(true)}>
          <img src={menuIcon} />
        </button>
        <nav className={`nav ${mobileMenu ? 'show-nav' : 'hide-nav'}`} onClick={() => toggleMobileMenu(false)}>
          <button className='close-menu'>
            <img src={closeIcon} />
          </button>
          <a className='link nav-how' href='#'>How it works?</a>
          <a className='link nav-browse' href='#'>Browse</a>
          <a className='link nav-research' href='#'>Research</a>
          <a className='link nav-about' href='#'>About</a>
          <a className='link nav-contacts' href='#'>Contacts</a>
          <a className='link nav-sign' href='#'>Sign Up</a>
        </nav>
      </header>

      <main>
        <Form />

        <ul className='contacts-list'>
          <li className='contact-location'><span className='text-container'>888 Brannan Street, <br />
              in San Francisco, California</span></li>
          <li className='contact-phone'><span className='text-container'>+1 (039) 032 03 84</span></li>
          <li className='contact-mail'><span className='text-container'>info@airbnb.com</span></li>
        </ul>

      </main>
    </div>
  );
}

export default App;
