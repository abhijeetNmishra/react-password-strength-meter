import React from 'react'
import { render } from 'react-dom';
import PasswordStrengthMeter from './password-strength-meter';

require('./style.css');

render(
  <PasswordStrengthMeter passwordText={"Password"} isDefaultCss={false}/>,document.getElementById('content')
)
