import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}
  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  body, header {
    font-family: sans-serif;
    font-weight: 400;
  }

  button{
    cursor: pointer;
  }

  input{
    outline: none;
  }

  input:focus::placeholder{
    color: transparent;
    outline: none;
  }
`;

export default GlobalStyle;
