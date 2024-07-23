'use client';

import { LocalStorageKey } from '@/constants/key-names';
import { useUserInfoContext } from '@/providers/token-provider';
import { useEffect, useState } from 'react';

export default function Header() {
  const { userInfo, setUserInfo } = useUserInfoContext();
  const [inputToken, setInputToken] = useState<string>('');
  const [inputName, setInputName] = useState<string>('');

  const setInfo = () => {
    setUserInfo({ user: inputName, token: inputToken });

    const result = window.confirm('Your user name and access token are saved in local storage.');
    if (result) {
      localStorage.setItem(LocalStorageKey.User, inputName);
      localStorage.setItem(LocalStorageKey.Token, inputToken);
    }
  };

  const clearInfo = () => {
    setUserInfo({ user: '', token: '' });
    setInputName('');
    setInputToken('');

    localStorage.removeItem(LocalStorageKey.User);
    localStorage.removeItem(LocalStorageKey.Token);
  };

  useEffect(() => {
    const user = localStorage.getItem(LocalStorageKey.User);
    const token = localStorage.getItem(LocalStorageKey.Token);

    if (user && token) {
      setUserInfo({ user, token });
      setInputToken(token);
      setInputName(user);
    }
  }, []);

  return (
    <div className="mx-2 my-5 flex drop-shadow-sm">
      <input
        className="w-3/12 rounded-l-lg border py-2 pl-3 text-lg"
        placeholder="Your user name"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        readOnly={inputName !== '' && userInfo.token === inputToken && userInfo.user === inputName}
        data-testid="name"
      />
      <input
        className="w-7/12 border py-2 pl-3 text-lg focus:outline-none"
        placeholder="Your access token"
        value={inputToken}
        onChange={(e) => setInputToken(e.target.value)}
        type="password"
        readOnly={inputToken !== '' && userInfo.token === inputToken && userInfo.user === inputName}
        data-testid="token"
      />
      <button
        onClick={setInfo}
        className="w-2/12 border bg-blue-200 px-3 py-2 text-lg disabled:bg-gray-200"
        disabled={(userInfo.token === inputToken && userInfo.user === inputName) || !inputToken || !inputName}
        data-testid="set"
      >
        Set
      </button>
      <button
        onClick={clearInfo}
        className="w-2/12 rounded-r-lg border bg-orange-300 px-3 py-2 text-lg disabled:bg-gray-200"
        disabled={!inputToken && !inputName}
        data-testid="clear"
      >
        Clear
      </button>
    </div>
  );
}
