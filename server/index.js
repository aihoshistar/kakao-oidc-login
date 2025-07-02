require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const {
  KAKAO_CLIENT_ID,
  KAKAO_REDIRECT_URI,
  KAKAO_CLIENT_SECRET,
} = process.env;

app.post('/auth/kakao', async (req, res) => {
  const { code } = req.body;

  try {
    const tokenRes = await axios.post('https://kauth.kakao.com/oauth/token', null, {
      params: {
        grant_type: 'authorization_code',
        client_id: KAKAO_CLIENT_ID,
        redirect_uri: KAKAO_REDIRECT_URI,
        code,
        client_secret: KAKAO_CLIENT_SECRET,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { id_token, access_token } = tokenRes.data;

    // id_token
    const [header, payload, signature] = id_token.split('.');
    const decoded = JSON.parse(Buffer.from(payload, 'base64').toString());

    res.json({
      id_token,
      access_token,
      user: decoded,
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'erre' });
  }
});

app.listen(4000, () => {
  console.log('http://localhost:4000');
});

