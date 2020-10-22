require('dotenv').config();
const fs = require('fs');
const path = require('path');
const express = require('express');
const https = require('https');
const LotifySampleApi = require('lotify_sample_api');
const axios = require('axios').default;
const app = express();

const port = process.env.PORT || 5000;
const myLiffId = process.env.MY_LIFF_ID;
const redirectUri = process.env.REDIRECT_URI;
const botAccessToken = process.env.BOT_ACCESS_TOKEN;
const LineNotifyToken = process.env.LINE_NOTIFY_TOKEN;

app.use(express.static('public'));
app.use(express.json());

app.get('/send-id', function (req, res) {
  res.json({ id: myLiffId, redirectUri });
});

app.post('/webhook', function (req, res) {
  const endpoint = req.body.endpoint;

  const url = 'https://api.line.me/v2/bot/channel/webhook/endpoint';
  const headers = {
    Authorization: `Bearer ${botAccessToken}`,
    'Content-Type': 'application/json',
  };

  axios
    .put(url, { endpoint }, { headers })
    .then(function (r) {
      let apiInstance = new LotifySampleApi.TextApi();
      let body = new LotifySampleApi.TextRequestBody(); // CodeRequestBody | Code
      body.token = LineNotifyToken;
      body.message = `已更改 Chatbot Webhook URL 至: ${endpoint}`;
      body.message = apiInstance.sendText(body, (error, data) => {
        if (error) {
          console.error(error);
        } else {
          console.log('API called successfully. Returned data: ' + data);
        }
      });
      res.json({ message: 'Webhook setting success' });
    })
    .catch(function (err) {
      console.log(err);
      res.status(400);
      res.json({ message: 'Webhook setting error' });
    });
});

if (process.env.NODE_ENV === 'development') {
  const devCert = fs.readFileSync(
    path.resolve(__dirname, 'cert/localhost.pem')
  );
  const devKey = fs.readFileSync(
    path.resolve(__dirname, 'cert/localhost-key.pem')
  );
  const server = https.createServer(
    {
      key: devKey,
      cert: devCert,
    },
    app
  );
  server.listen(8000, function () {
    console.log(`https listening on port 8000!`);
  });
}
app.listen(port, () => console.log(`http listening on port ${port}!`));
