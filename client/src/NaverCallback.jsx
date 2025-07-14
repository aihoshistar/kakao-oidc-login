import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function NaverCallback() {
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState(null);

  const code = searchParams.get('code');
  const state = searchParams.get('state');

  // useEffect(() => {
  //   if (code && state) {
  //     fetch('http://localhost:31545/api/v1/auth/naver/login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ code, state }),
  //     })
  //       .then(res => res.json())
  //       .then(data => setUser(data.user))
  //       .catch(console.error);
  //   }
  // }, [code, state]);

  if (!user) return <p>{code}로그인 중...{state}</p>;

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>로그인됨: {user.name || user.nickname}</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
