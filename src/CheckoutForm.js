import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Name",
      mobile: "+65 88888888",
      address: "Street address",
      zipcode: "Zip code",
      country: "Singapore",
      complete: false,
      error: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }
  handleChange(event) {
    event.preventDefault();

    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  async submit(ev) {
    const { name } = this.state;
    let { token } = await this.props.stripe.createToken({ name });
    const response = await fetch("https://bd047.sse.codesandbox.io/charge", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: token.id
    });
    if (response.ok) {
      this.setState({ complete: true });
      // Send an mobile.
    } else {
      this.setState({ error: "Could not complete payment" });
    }
  }

  render() {
    const {
      name,
      mobile,
      address,
      country,
      zipcode,
      complete,
      error
    } = this.state;
    return (
      <React.Fragment>
        {error && <div className="error">{error}</div>}
        {complete ? (
          <h1>Payment Complete</h1>
        ) : (
          <div className="card">
            <div className="logo">
              <img src="https://i.ibb.co/7YTx314/HH-Logo.png" width="80" />
            </div>
            <h1>MAKE </h1>
            <h1>PAYMENT</h1>
            <p>To access your bill details, please go to healthhub.sg. </p>
            {/* <label>Name</label>          */}
            <input
              name="name"
              type="text"
              placeholder={name}
              value={name}
              onChange={this.handleChange}
              className="StripeElement1"
              required
            />
            {/* <label>Mobile</label>          */}
            <input
              name="mobile"
              type="number"
              placeholder={mobile}
              value={mobile}
              onChange={this.handleChange}
              className="StripeElement1"
              required
            />
            {/* <label>Address</label>          */}
            <input
              name="address"
              type="address"
              placeholder={address}
              value={address}
              onChange={this.handleChange}
              className="StripeElement2"
              required
            />
            {/* <label>Address</label>          */}
            <input
              name="country"
              type="country"
              placeholder={country}
              value={country}
              onChange={this.handleChange}
              className="StripeElement1"
              required
            />
            {/* <label>Zip code</label>          */}
            <input
              name="zipcode"
              type="zipcode"
              placeholder={zipcode}
              value={zipcode}
              onChange={this.handleChange}
              className="StripeElement1"
              required
            />
            {/* <label>Card number</label>          */}
            <CardElement />
            <button onClick={this.submit}>Pay $159.12</button>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default injectStripe(CheckoutForm);
