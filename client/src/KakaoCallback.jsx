import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function KakaoCallback() {
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState(null);
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      fetch('http://localhost:4000/auth/kakao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setUser(data.user);
        })
        .catch(console.error);
    }
  }, [code]);

  if (!user) return <p>로그인 중...</p>;

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>로그인됨 {user.nickname || user.name}</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

