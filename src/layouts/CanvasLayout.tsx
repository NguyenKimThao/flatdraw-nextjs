import React from 'react';

import Canvas from '~/components/Canvas';
import CanvasEventListeners from '~/components/CanvasEventListeners';

export default function CanvasLayout() {
  return (
    <>
      <Canvas />
      <CanvasEventListeners />
    </>
  );
}
