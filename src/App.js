import React from "react";
import { Switch, Route, Link } from "react-router-dom"
import Form from "./components/Form"

const App = () => {
  return (
    <>
      <h1>Lambda Eats</h1>
      <p>You can remove this code and create your own header</p>
      <Link to="/pizza">Pizza?</Link>
      <Switch>
        <Route path="/pizza" component={Form} />
        <Route path ="/" />
      </Switch>
    </>
  );
};
export default App;
