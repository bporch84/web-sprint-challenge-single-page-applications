import React from "react";
import { Switch, Route, Link } from "react-router-dom"
import Form from "./components/Form"
import styled from "styled-components"

const StyledHeader = styled.div`
h1, h2, p {
  text-align: center;
}

h1 {
  font-size: 100px;
  margin: 0;
  text-shadow: 2px 2px 5px red;
}

h2 {
  font-size: 35px;
  color: red;
  text-shadow: 2px 2px 5px black;
  margin-top: 0;
}

p {
  font-size: 20px;
  padding: 10px 25px;
  background-color: red;
  color: black;
  border: 3px solid black;
  box-shadow: 2px 2px 5px black;
  width: 5%;
  margin: 0 auto;
  margin-bottom: 50px;
}
`

const App = () => {
  return (
    <StyledHeader>
      <h1>Lambda Eats</h1>
      <h2>NOM NOM NOM NOM</h2>
      <Link style={{textDecoration: "none"}} to="/pizza"><p>Pizza?</p></Link>
      <Switch>
        <Route path="/pizza" component={Form} />
        <Route path ="/" />
      </Switch>
    </StyledHeader>
  );
};
export default App;
