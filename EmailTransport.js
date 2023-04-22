import React, { useState } from 'react';
import axios from 'axios';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name,
      email,
      subject,
      message,
    };
    axios.post('/send-email', data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      <label>Email:</label>
      <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      <label>Subject:</label>
      <input type="text" value={subject} onChange={(event) => setSubject(event.target.value)} />
      <label>Message:</label>
      <textarea value={message} onChange={(event) => setMessage(event.target.value)}></textarea>
      <button type="submit">Send</button>
    </form>
  );
}
export default ContactForm;


const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.post('/send-email', (req, res) => {
  const { name, email, subject, message } = req.body;
  const mailOptions = {
    from: 'youremail@gmail.com',
    to: email,
    subject: subject,
    html: `
      <h3>Name: ${name}</h3>
      <h3>Email: ${email}</h3>
      <p>${message}</p>
    `
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent');
    }
  });
});
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
