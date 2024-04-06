import React, { useEffect } from 'react';

import Canvas from '~/components/Canvas';
import CanvasEventListeners from '~/components/CanvasEventListeners';
import Overlay from '~/components/Overlay';
import useUserStore, { StatusAuthen } from '~/hooks/useUserStore';
import LoginLayout from './LoginLayout';
import LogoutLayout from './LogoutLayout';

export default function AppLayout() {
  const statusAuthen = useUserStore((state) => state.statusAuthen);

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
    <>
      <Overlay />
      <Canvas />
      <CanvasEventListeners />
    </>
  );
}
