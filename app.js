// app.js

const express = require('express');
const QRCode = require('qrcode');
const app = express();
const PORT = 9999;

app.get('/', async (req, res) => {
  try {
    const data = req.query.data || null;

    if (!data) {
      res.status(404).send("Page not found")
      return;
    }

    const qrCodeImage = await QRCode.toBuffer(data);
    res.setHeader('content-type', 'image/png');
    res.send(qrCodeImage);
  } catch (err) {
    console.error('Error generating QR code:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});