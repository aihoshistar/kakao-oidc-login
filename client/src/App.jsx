const CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:5173/auth/kakao/callback';
const SCOPE = 'profile_nickname profile_image account_email';

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;

const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
const NAVER_REDIRECT_URI = 'http://localhost:5173/auth/naver/callback';
const NAVER_STATE = crypto.randomUUID();

const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${NAVER_STATE}`;

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
      <h1>네이버 로그인 test</h1>
      <a href={NAVER_AUTH_URL}>
        <img
          src="https://static.nid.naver.com/oauth/small_g_in.PNG"
          alt="네이버 로그인"
        />
      </a>
    </div>
  );
}

