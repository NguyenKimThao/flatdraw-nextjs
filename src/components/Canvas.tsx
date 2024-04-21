import styled from '@emotion/styled';
import { OrbitControls } from "@react-three/drei";
import { Canvas as CanvasThree, useFrame, useThree } from "@react-three/fiber";
import React, { useRef, type PointerEvent, type Touch, type TouchEvent, useEffect, useState } from 'react';

import BoxCube, { BoxDraw } from '~/components/BoxCube';
import { TRANSPARENT_BACKGROUND_IMAGE } from '~/config/constants';
import { APP_FIXED_MAIN_UNIQUE_ID } from '~/config/globalElementIds';
import { CANVAS_CONTROLS_OVERLAY } from '~/config/globalElementIds';
import type { ActionModeOption } from '~/config/types';
import useCanvasContext from '~/context/useCanvasContext';
import useCanvasCubeContext from '~/context/useCanvasContext/useCanvasCubeContext';
import useActionMode from '~/store/useActionMode';
import useActiveObjectId from '~/store/useActiveObjectId';
import useAvailableColors from '~/store/useAvailableColors';
import useActiveBoxCubeId from '~/store/useBoxCubeId';
import useActiveBoxGroupId from '~/store/useBoxGroupId';
import useActiveBoxLayerId from '~/store/useBoxLayerId';
import useCanvasObjects from '~/store/useCanvasObjects';
import useCanvasWorkingSize from '~/store/useCanvasWorkingSize';
import useDefaultParams from '~/store/useDefaultParams';
import useScrollPosition from '~/store/useScrollPosition';
import useUserMode from '~/store/useUserMode';
import useWindowSize from '~/store/useWindowSize';
import useZoom from '~/store/useZoom';
import theme from '~/theme';
import generateUniqueId from '~/utils/generateUniqueId';
import getControlPoints from '~/utils/getControlPoints';
import getCursorFromModes from '~/utils/getCursorFromModes';
import getDimensionsFromFreeDraw from '~/utils/getDimensionsFromFreeDraw';
import getRelativeMousePositionOnCanvas from '~/utils/getRelativeMousePositionOnCanvas';
import isCursorWithinRectangle from '~/utils/isCursorWithinRectangle';



const FixedMain = styled('main')`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: ${theme.layers.canvasApp};
  user-select: none;
`;

type PointerOrTouchEvent = PointerEvent<HTMLElement> | TouchEvent<HTMLElement>;

const CanvasBox = () => {
  const zoom = useZoom((state) => state.zoom);
  const posY = useZoom((state) => state.posY);

  const { camera } = useThree();
  const [position, setPostion] = useState([0, 0, 0]);
  const [positionIndex, setPostionIndex] = useState([0, 0, 0]);
  const defaultParams = useDefaultParams((state) => state.defaultParams);
  const setDefaultParams = useDefaultParams((state) => state.setDefaultParams);

  const activeBoxLayerId = useActiveBoxLayerId((state) => state.activeBoxLayerId);
  const activeBoxGroupId = useActiveBoxGroupId((state) => state.activeBoxGroupId);
  const activeBoxCubeId = useActiveBoxCubeId((state) => state.activeBoxCubeId);
  const boxLayerObjects = useCanvasObjects((state) => state.boxLayerObjects);

  const activeObjectLayer = boxLayerObjects?.find((object) => object.id === activeBoxLayerId);
  const activeObjectGroup = activeObjectLayer?.boxGroup?.find((object) => object.id === activeBoxGroupId);
  const activeObject = activeObjectGroup?.boxGroup?.find(object => object.id == activeBoxCubeId);
  const userMode = useUserMode((state) => state.userMode);

  const posXIndex = activeObjectLayer?.position[0] || 0;
  const posYIndex = activeObjectLayer?.position[1] || 0;
  const posZIndex = activeObjectLayer?.position[2] || 0;
  const show = userMode == "boxCube" && !activeObject && activeObjectLayer && activeObjectGroup;
  const distance = zoom / 4;

  useFrame(({ mouse, viewport }) => {
    if (!show || !activeObjectLayer || !activeObjectLayer.position || !activeObjectGroup || activeObject) {
      return;
    }
    const viewportNew = viewport.getCurrentViewport(camera)
    const x = (mouse.x * viewportNew.width / 2);
    const y = (mouse.y * viewportNew.height / 2);
    const sc = activeObjectLayer.position[2] / distance;



    const newPos = [x - x * sc, y - y * sc - posY, + posZIndex];
    if ((position[0] != newPos[0]) || (position[1] != newPos[1]) || (position[2] != newPos[2])) {
      const pos = [Math.round(newPos[0]), Math.round(newPos[1]), Math.round(newPos[2])]
      setPostion(newPos);
      setPostionIndex(pos)
      setDefaultParams({
        ...defaultParams,
        positionBoxCube: [pos[0] - posXIndex, pos[1] - posYIndex, pos[2] - posZIndex]
      })
    }
  });


  return (
    <group>
      <BoxDraw position={position} show={show ? true : false} doc={parseInt(defaultParams.docBoxCube)} count={parseInt(defaultParams.countBoxCube)} color={defaultParams.colorBoxCube} />
      <BoxDraw position={positionIndex} show={show ? true : false} doc={parseInt(defaultParams.docBoxCube)} count={parseInt(defaultParams.countBoxCube)} color={defaultParams.colorBoxCube} />
    </group>
  )
}


export default function Canvas() {
  const { canvasRef, contextRef, drawEverything } = useCanvasContext();
  const { canvasCubeRef, orbitControlRef } = useCanvasCubeContext();

  const activeObjectId = useActiveObjectId((state) => state.activeObjectId);
  const setActiveObjectId = useActiveObjectId((state) => state.setActiveObjectId);

  const canvasObjects = useCanvasObjects((state) => state.canvasObjects);
  const boxLayerObjects = useCanvasObjects((state) => state.boxLayerObjects);
  const appendBoxCubeObject = useCanvasObjects((state) => state.appendBoxCubeObject);

  const canvasWorkingSize = useCanvasWorkingSize((state) => state.canvasWorkingSize);

  const defaultParams = useDefaultParams((state) => state.defaultParams);
  const setDefaultParams = useDefaultParams((state) => state.setDefaultParams);

  const userMode = useUserMode((state) => state.userMode);
  const setUserMode = useUserMode((state) => state.setUserMode);

  const actionMode = useActionMode((state) => state.actionMode);
  const setActionMode = useActionMode((state) => state.setActionMode);

  const zoom = useZoom((state) => state.zoom);
  const posY = useZoom((state) => state.posY);

  const initialDrawingPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const activeObject = canvasObjects.find((canvasObject) => canvasObject.id === activeObjectId);

  const activeBoxLayerId = useActiveBoxLayerId((state) => state.activeBoxLayerId);
  const activeBoxGroupId = useActiveBoxGroupId((state) => state.activeBoxGroupId);
  const activeBoxCubeId = useActiveBoxCubeId((state) => state.activeBoxCubeId);

  const activeObjectLayer = boxLayerObjects?.find((object) => object.id === activeBoxLayerId);
  const activeObjectGroup = activeObjectLayer?.boxGroup?.find((object) => object.id === activeBoxGroupId);
  const activeObjectCube = activeObjectGroup?.boxGroup?.find(object => object.id == activeBoxCubeId);
  const availableColors = useAvailableColors((state) => state.availableColors);


  const onPointerDown = (event: PointerOrTouchEvent) => {
    event.preventDefault();
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

  };

  // On pointer move

  const onPointerMove = (event: PointerOrTouchEvent) => {
    event.preventDefault();
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context || !actionMode) return;
  };

  // On pointer up

  const onPointerUp = (event: PointerOrTouchEvent) => {
    event.preventDefault();
    if (userMode != "boxCube") {
      return;
    }

    if (!activeObjectLayer || !activeObjectGroup) {
      return;
    }
    if (!activeObjectCube) {
      const createdBoxCubeId = generateUniqueId();
      appendBoxCubeObject(activeObjectLayer.id, activeObjectGroup.id, {
        id: createdBoxCubeId,
        position: defaultParams.positionBoxCube,
        name: defaultParams.nameBoxCube,
        boxGroupId: activeObjectGroup.id,
        color: defaultParams.colorBoxCube,
        count: parseInt(defaultParams.countBoxCube) || 0,
        doc: parseInt(defaultParams.docBoxCube) || 0,
        type: 'boxCube',
      });
      return;
    }

  };
  const onKeyUp = (event: any) => {
    event.preventDefault();
    if (userMode != "boxCube" || activeObjectCube) {
      return;
    }
    if (event.key == "1" || event.key == "2" || event.key == "3") {
      setDefaultParams({
        ...defaultParams,
        countBoxCube: event.key
      })
    } else if (event.key == "d") {
      setDefaultParams({
        ...defaultParams,
        docBoxCube: defaultParams.docBoxCube == "1" ? "0" : "1"
      })
    }
    else if (event.key == "f") {
      const ob = Object.keys(availableColors);
      let idx = ob.indexOf(defaultParams.colorBoxCube);
      if (idx < 0 || idx == ob.length - 1) {
        idx = -1
      }
      idx = idx + 1
      setDefaultParams({
        ...defaultParams,
        colorBoxCube: ob[idx]
      })
    } else if (event.key == "g") {
      const ob = Object.keys(availableColors);
      let idx = ob.indexOf(defaultParams.colorBoxCube);
      if (idx < 0 || idx == 0) {
        idx = ob.length - 1
      }
      idx = idx - 1
      setDefaultParams({
        ...defaultParams,
        colorBoxCube: ob[idx]
      })
    }
  }

  useEffect(() => {
    document.addEventListener("keyup", onKeyUp);
    return () => {
      document.removeEventListener("keyup", onKeyUp);
    }
  })

  useEffect(() => {
    if (userMode != 'select') {
      if (orbitControlRef && orbitControlRef.current) {
        orbitControlRef.current.reset(0);
      }
    }
  }, [userMode, orbitControlRef]);


  return (
    <FixedMain
      id={APP_FIXED_MAIN_UNIQUE_ID}
      style={{
        cursor: getCursorFromModes({ userMode, actionMode }),
      }}

      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onTouchStart={onPointerDown}
      onTouchMove={onPointerMove}
      onTouchEnd={onPointerUp}
    >
      <CanvasThree ref={canvasCubeRef} scene={{ position: [0, posY, 0] }} onKeyUp={onKeyUp} style={{ width: "100%", height: "100vh", background: "rgb(172,173,165)" }}>
        <OrbitControls minDistance={zoom / 4}
          maxDistance={zoom / 4} ref={orbitControlRef}
          enableRotate={userMode == 'select'} />
        <ambientLight intensity={0.5} />
        <spotLight position={[0, 20, 0]} angle={0.3} />
        <CanvasBox></CanvasBox>
        {boxLayerObjects.map((box, idx) => {
          return (
            <BoxCube key={box.id || idx} {...box} />
          )
        })}

      </CanvasThree>
    </FixedMain >
  );
}
