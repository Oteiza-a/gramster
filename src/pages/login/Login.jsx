import React from 'react';
import { GramsterLogoText } from '../../components/gramster-logo-text/GramsterLogoText';
import { Separator } from '../../components/separator/Separator';
import './Login.css'

export function Login() {

  return (
    <div className='login-page-conteiner'>
      <div className='basic-card login-form-container'>

        <div className='login-logo-container'>
          <GramsterLogoText fontSize='40px' />
        </div>

        <Separator/>

        <div>Sign up to your account</div>

      </div>
    </div>
  );
}