'use client';

import { UserInfoContext } from '@/providers/token-provider';
import { useContext, useState } from 'react';

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const [inputToken, setInputToken] = useState<string>('');
  const [inputName, setInputName] = useState<string>('');

  return (
    <div className="mx-2 my-5 flex">
      <input
        className="w-3/12 rounded-l-lg border py-2 pl-3 text-lg"
        placeholder="Your user name"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
      />
      <input
        className="w-7/12 border py-2 pl-3 text-lg focus:outline-none"
        placeholder="Your access token"
        value={inputToken}
        onChange={(e) => setInputToken(e.target.value)}
      />
      <button
        onClick={() => setUserInfo({ user: inputName, token: inputToken })}
        className="w-2/12 rounded-r-lg border px-3 py-2 text-lg disabled:bg-gray-200"
        disabled={userInfo.token === inputToken && userInfo.user === inputName}
      >
        Set Info
      </button>
    </div>
  );
}
