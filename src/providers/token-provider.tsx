'use client';

import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

export const UserInfoContext = createContext<{
  userInfo: { user: string; token: string };
  setUserInfo: Dispatch<
    SetStateAction<{
      user: string;
      token: string;
    }>
  >;
}>({
  userInfo: { user: '', token: '' },
  setUserInfo: () => {},
});

export const useUserInfoContext = () => useContext(UserInfoContext);

export default function TokenProvider({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState<{ user: string; token: string }>({ user: '', token: '' });

  return (
    <UserInfoContext.Provider value={{ userInfo: userInfo, setUserInfo: setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
}
