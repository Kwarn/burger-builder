import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
  }

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        <form>
          <input type="text" name="name" placeholder="Your name"></input>
          <input type="email" name="email" placeholder="Your Mail"></input>
          <input type="text" name="street" placeholder="Street"></input>
          <input type="text" name="postcode" placeholder="Postal Code"></input>
        </form>
        <Button btnType="Success">ORDER</Button>
      </div>
    )
  }
}

export default ContactData
