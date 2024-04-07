import React from 'react';
import CanvasEventListeners from '~/components/CanvasEventListeners';
import Canvas from '~/components/Canvas';

export default function CanvasLayout() {
    return (
        <>
            <Canvas />
            <CanvasEventListeners />
        </>
    );
}
