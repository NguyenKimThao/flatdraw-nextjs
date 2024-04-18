import React, { useEffect } from 'react';

import Overlay from '~/components/Overlay';
import useCollectionApi from '~/hooks/useCollectionApi';
import useUserStore, { StatusAuthen } from '~/hooks/useUserStore';

import LoginLayout from './LoginLayout';
import LogoutLayout from './LogoutLayout';
import PageLayout from './PageLayout';

export default function AppLayout() {
  const statusAuthen = useUserStore((state) => state.statusAuthen);
  useCollectionApi((state) => state.status);

  useEffect(() => {
    const html = document.querySelector('html');

    if (html) {
      html.style.overflow = 'hidden';
    }

    return () => {
      if (html) {
        html.style.overflow = 'auto';
      }
    };
  }, []);
  if (statusAuthen == StatusAuthen.LOGOUT) {
    return (
      <LogoutLayout />
    )
  }
  if (statusAuthen != StatusAuthen.AUTHENTICATED) {
    return (
      <LoginLayout />
    )
  }


  return (
    <PageLayout />
  );
}
