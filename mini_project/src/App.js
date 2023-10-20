import { Link } from 'react-router-dom';
import './App.css';
import Allproducts from './Pages/Allproducts';
import Router from './Routes/Router';
import styled from 'styled-components';

function App() {
  return (
    <DIV className="App">
      <NAV>
        <BUTTON>
        <Link to={"/"}>Products</Link>
        </BUTTON>
        <BUTTON>
        <Link to={"/admin"}>Admin</Link>
        </BUTTON>
      </NAV>
     <Router/>
    </DIV>
  );
}

export default App;

const DIV = styled.div`

margin-top: 30px;


`


const NAV = styled.div`

width: 400px;
display: flex;
justify-content: space-between;
margin: auto;
font-size: 20px;

`

const BUTTON = styled.button`
 border: none;
  display: block;
  position: relative;
  padding: 0.7em 2.4em;
  font-size: 18px;
  background: transparent;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
  color: royalblue;
  z-index: 1;
  font-family: inherit;
  font-weight: 500;
  a {
    text-decoration:none;
  
}

:hover,:focus {
  color: #ffffff;
  background: #008cff;
  border: 1px solid #008cff;
  text-shadow: 0 0 5px #ffffff,
              0 0 10px #ffffff,
              0 0 20px #ffffff;
  box-shadow: 0 0 5px #008cff,
              0 0 20px #008cff,
              0 0 50px #008cff,
              0 0 100px #008cff;
}
:hover a{
  color: #ffffff;
}
`