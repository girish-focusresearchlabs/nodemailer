const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

const PORT = 7000;

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "parankannai@gmail.com",
    pass: "jhbt xktp zclx prxl"
  }
});

// Route to send email
app.post('/api/mail/send', async (req, res) => {
  const { to, subject, message, html,name,email,phone } = req.body;

  const mailOptions = {
    from: "parankannai@gmail.com",
    to,
    subject,
    message,
    html: `
    <h2>Appointment Received </h2>
    <table border="1" cellpadding="10">
      <tr>
        <th>Name</th>
        <td>${name}</td>
      </tr>
      <tr>
        <th>Email</th>
        <td>${email}</td>
      </tr>
      <tr>
        <th>Phone</th>
        <td>${phone}</td>
      </tr>
      <tr>
        <th>Message</th>
        <td>${message}</td>
      </tr>
    </table>
  `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
