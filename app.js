const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ahmed.abouissa.aai@gmail.com",
    pass: "vqmf obcp whxx ordh",
  },
});

app.post("/api/send", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const country = req.body.country;
  const phoneNumber = req.body.phoneNumber;
  const mailOptions = {
    from: email,
    to: "abdelrahman.amer@icloudit.com",
    subject: "Contact me",
    html: `
    <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Email Template</title>
</head>
<body>
    <div style="background-color: #f1f1f1; padding: 20px;">
        <h1 style="text-align: center; color: #333;">Thank you for reaching us!</h1>
    </div>
    <div style="padding: 20px;">
    <h1>Name: ${firstName} ${lastName}</h1>
    <h1>Phone Number: ${phoneNumber}</h1>
    <h1>Country: ${country}</h1>
    </div>
</body>
</html>
    `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.status(200).send("Email sent successfully");
  });
});

const port = 3030;
app.listen(port, () => console.log(`Server running on port ${port}`));
