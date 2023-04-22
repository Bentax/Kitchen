import React, { useState } from 'react';
import axios from 'axios';

function ContactForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      phoneNumber,
      message,
    };
    axios.post('/send-whatsapp', data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Phone Number:</label>
      <input type="text" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
      <label>Message:</label>
      <textarea value={message} onChange={(event) => setMessage(event.target.value)}></textarea>
      <button type="submit">Send</button>
    </form>
  );
}
export default ContactForm;

const express = require('express');
const app = express();
const twilio = require('twilio');
const accountSid = 'YOUR_ACCOUNT_SID';
const authToken = 'YOUR_AUTH_TOKEN';
const client = twilio(accountSid, authToken);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.post('/send-whatsapp', (req, res) => {
  const { phoneNumber, message } = req.body;
  client.messages.create({
    from: 'whatsapp:+14155238886',
    to: `whatsapp:${phoneNumber}`,
    body: message,
  })
  .then((message) => {
    console.log('Message sent: ', message.sid);
    res.status(200).send('WhatsApp message sent');
  })
  .catch((error) => {
    console.log(error);
    res.status(500).send('Error sending WhatsApp message');
  });
});
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

