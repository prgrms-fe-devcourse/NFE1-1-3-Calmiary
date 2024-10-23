import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
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
