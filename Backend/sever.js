const express = require('express');
require('dotenv').config();
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

const port = 5000;

app.use(express.json());
app.use(cors()); 

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });


  const mailOptions = {
    from: email, 
    to: process.env.EMAIL_USER,
    subject: `New message from ${name}`,
    text: message,
  };
  console.log(req.body);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});