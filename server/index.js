const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;
require('dotenv').config();

app.use(express.json());
app.use('/api/v1', require('./src/v1/routes/auth'));

//DB接続
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log('DBと接続中');
} catch (error) {
  console.log(error);
}

app.listen(PORT, () => {
  console.log('ローカルサーバー起動中');
});
