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

app.post('/auth/naver', async (req, res) => {
  const { code, state } = req.body;

  try {
    console.log(1, );
    const tokenRes = await axios.post('https://nid.naver.com/oauth2.0/token', null, {
      params: {
        grant_type: 'authorization_code',
        client_id: process.env.NAVER_CLIENT_ID,
        client_secret: process.env.NAVER_CLIENT_SECRET,
        code,
        state,
      },
    });

    console.log('tokenRes', tokenRes);
    const { access_token } = tokenRes.data;

    console.log('tokenRes.data', tokenRes.data);
    console.log('access_token', access_token);
    // 유저 정보 조회
    const userRes = await axios.get('https://openapi.naver.com/v1/nid/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log('userRes', userRes);

    res.json({
      access_token,
      user: userRes.data.response,
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'ㅅㅂ' });
  }
});


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
  console.log('http://localhost:31545');
});

