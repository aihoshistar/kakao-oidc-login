const CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const REDIRECT_URI = 'http://localhost::5173/auth/kakao/callback';
const SCOPE = 'openid profile account_email';

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;

export default function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>카카오 로그인 test</h1>
      <a href={KAKAO_AUTH_URL}>
        <img
          src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
          alt="카카오 로그인"
        />
      </a>
    </div>
  );
}

