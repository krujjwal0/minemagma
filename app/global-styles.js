import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
    margin:0;
    padding:0;
    font-family:'Nunito';    
  }
  body{
    background-color: #E5E5E5;
  }
  .dashboard, .regulatory, .categories{
    display:flex;
    height: 89vh;
    align-items: center;
    justify-content: start;
    font-size:3rem;
    margin-left:250px;
    border-radius: 70px 0px 0px 0px;
    background-color: #F3F3F9;
  }
  .maindash{
    display:flex;
  
    margin-left:250px;
    border-radius: 70px 0px 0px 0px;
    background-color: #F3F3F9;
    
  }
  .maindash1{
    // display:flex;
  
    // margin-left:250px;
    border-radius: 70px 0px 0px 0px;
    background-color: #F3F3F9;
    
  }
  .myprofile{
    display:flex;
    height: 89vh;
    margin-left:250px;
    border-radius: 70px 0px 0px 0px;
    background-color: #ffff;
  }
  .content {
    display:flex;
    min-height: 89vh;
    height: 100%;
    margin-left:250px;
    border-radius: 70px 0px 0px 0px;
    background-color: #ffff;
  }
`;


export default GlobalStyle;
/** html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  } */

// height: 89vh;
