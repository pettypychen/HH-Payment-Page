import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Elements, StripeProvider } from "react-stripe-elements";

import CheckoutForm from "./CheckoutForm";
// card: 4000008260000000
// post code: EC2N 2DB
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <StripeProvider apiKey="pk_test_jmNRpR4rh4vK0KhO2Oo1cdrs">
        <div className="example">
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
