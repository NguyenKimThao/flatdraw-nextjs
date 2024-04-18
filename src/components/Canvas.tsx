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

  const posZIndex = activeObjectLayer?.position[2] || 0;
  const show = userMode == "boxCube" && !activeObject;
  let distance = zoom / 4;

  useFrame(({ mouse, viewport }) => {
    if (!show || !activeObjectLayer || !activeObjectLayer.position || !activeObjectGroup || activeObject) {
      return;
    }
    let viewportNew = viewport.getCurrentViewport(camera)
    const x = (mouse.x * viewportNew.width / 2);
    const y = (mouse.y * viewportNew.height / 2);
    const sc = activeObjectLayer.position[2] / distance;



    const newPos = [x - x * sc, y - y * sc, 0];
    // console.log('mouse', position, newPos)
    if ((position[0] != newPos[0]) || (position[1] != newPos[1]) || (position[2] != newPos[2])) {
      setPostion(newPos);
      const pos = [Math.round(newPos[0]), Math.round(newPos[1]), Math.round(newPos[2])]
      setPostionIndex(pos)
      setDefaultParams({
        ...defaultParams,
        positionBoxCube: pos
      })
    }
  });



  return (
    <group>
      <BoxDraw position={[position[0], position[1], position[2] + posZIndex]} show={show && activeObjectLayer ? true : false} doc={parseInt(defaultParams.docBoxCube)} count={parseInt(defaultParams.countBoxCube)} color={defaultParams.colorBoxCube} />
      <BoxDraw position={[positionIndex[0], positionIndex[1], positionIndex[2] + posZIndex]} show={show && activeObjectLayer ? true : false} doc={parseInt(defaultParams.docBoxCube)} count={parseInt(defaultParams.countBoxCube)} color={defaultParams.colorBoxCube} />
    </group>
  )
}


export default function Canvas() {
  const { canvasRef, contextRef, drawEverything } = useCanvasContext();

  const previousTouchRef = useRef<Touch | null>(null);
  const distanceBetweenTouchesRef = useRef<number>(0);

  const windowSize = useWindowSize((state) => state.windowSize);

  const activeObjectId = useActiveObjectId((state) => state.activeObjectId);
  const setActiveObjectId = useActiveObjectId((state) => state.setActiveObjectId);

  const canvasObjects = useCanvasObjects((state) => state.canvasObjects);
  const boxLayerObjects = useCanvasObjects((state) => state.boxLayerObjects);
  const appendRectangleObject = useCanvasObjects((state) => state.appendRectangleObject);
  const appendEllipseObject = useCanvasObjects((state) => state.appendEllipseObject);
  const appendFreeDrawObject = useCanvasObjects((state) => state.appendFreeDrawObject);
  const appendTextObject = useCanvasObjects((state) => state.appendTextObject);
  const updateCanvasObject = useCanvasObjects((state) => state.updateCanvasObject);
  const appendFreeDrawPointToCanvasObject = useCanvasObjects((state) => state.appendFreeDrawPointToCanvasObject);
  const moveCanvasObject = useCanvasObjects((state) => state.moveCanvasObject);
  const resizeCanvasObject = useCanvasObjects((state) => state.resizeCanvasObject);
  const appendBoxCubeObject = useCanvasObjects((state) => state.appendBoxCubeObject);
  const updateBoxCubeObject = useCanvasObjects((state) => state.updateBoxCubeObject);
  const removeBoxCubeObject = useCanvasObjects((state) => state.removeBoxCubeObject);

  const canvasWorkingSize = useCanvasWorkingSize((state) => state.canvasWorkingSize);

  const defaultParams = useDefaultParams((state) => state.defaultParams);
  const setDefaultParams = useDefaultParams((state) => state.setDefaultParams);

  const incrementZoom = useZoom((state) => state.incrementZoom);
  const decrementZoom = useZoom((state) => state.decrementZoom);

  const scrollPosition = useScrollPosition((state) => state.scrollPosition);
  const updateScrollPosition = useScrollPosition((state) => state.updateScrollPosition);

  const userMode = useUserMode((state) => state.userMode);
  const setUserMode = useUserMode((state) => state.setUserMode);

  const actionMode = useActionMode((state) => state.actionMode);
  const setActionMode = useActionMode((state) => state.setActionMode);

  const zoom = useZoom((state) => state.zoom);

  const initialDrawingPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const activeObject = canvasObjects.find((canvasObject) => canvasObject.id === activeObjectId);

  const activeBoxLayerId = useActiveBoxLayerId((state) => state.activeBoxLayerId);
  const activeBoxGroupId = useActiveBoxGroupId((state) => state.activeBoxGroupId);
  const activeBoxCubeId = useActiveBoxCubeId((state) => state.activeBoxCubeId);

  const activeObjectLayer = boxLayerObjects?.find((object) => object.id === activeBoxLayerId);
  const activeObjectGroup = activeObjectLayer?.boxGroup?.find((object) => object.id === activeBoxGroupId);
  const activeObjectCube = activeObjectGroup?.boxGroup?.find(object => object.id == activeBoxCubeId);
  const availableColors = useAvailableColors((state) => state.availableColors);

  // On pointer down

  const onPointerDown = (event: PointerOrTouchEvent) => {
    event.preventDefault();
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    const clientX = 'clientX' in event ? event.clientX : event.touches[0]?.clientX;
    const clientY = 'clientY' in event ? event.clientY : event.touches[0]?.clientY;

    const relativeMousePosition = getRelativeMousePositionOnCanvas({
      windowMouseX: clientX,
      windowMouseY: clientY,
      canvasWorkingSize,
      scrollPosition,
      zoom,
    });

    initialDrawingPositionRef.current = {
      x: relativeMousePosition.relativeMouseX,
      y: relativeMousePosition.relativeMouseY,
    };
    const createdObjectId = generateUniqueId();

    switch (userMode) {
      case 'icon':
      case 'image':
      case 'select': {
        let isResizing = false;
        // Resize object
        if (activeObject) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { position, ...boxes } = getControlPoints({
            canvasObject: activeObject,
            zoom,
          });
          Object.entries(boxes).forEach(([boxName, box]) => {
            const isWithinBounds = isCursorWithinRectangle({
              x: box.x,
              y: box.y,
              width: box.width,
              height: box.height,
              relativeMouseX: initialDrawingPositionRef.current.x,
              relativeMouseY: initialDrawingPositionRef.current.y,
            });
            if (isWithinBounds) {
              isResizing = true;
              setActionMode({
                type: 'isResizing',
                option: boxName.split('Box')[0] as ActionModeOption,
              });
            }
          });
        }
        if (!isResizing) {
          const clickedObjects = canvasObjects.filter((canvasObject) => {
            return isCursorWithinRectangle({
              x: canvasObject.x,
              y: canvasObject.y,
              width: canvasObject.width,
              height: canvasObject.height,
              relativeMouseX: initialDrawingPositionRef.current.x,
              relativeMouseY: initialDrawingPositionRef.current.y,
            });
          });
          const clickedObject = clickedObjects[clickedObjects.length - 1];
          const wasClickInsideWorkingCanvas = isCursorWithinRectangle({
            x: 0,
            y: 0,
            width: canvasWorkingSize.width,
            height: canvasWorkingSize.height,
            relativeMouseX: initialDrawingPositionRef.current.x,
            relativeMouseY: initialDrawingPositionRef.current.y,
          });
          const shouldClearSelection = !wasClickInsideWorkingCanvas && clickedObject?.id !== activeObjectId;
          setActiveObjectId(shouldClearSelection ? null : clickedObject?.id || null);
          if (clickedObject) {
            setUserMode('select');
            setActionMode({ type: 'isMoving' });
          } else {
            setActionMode({ type: 'isPanning' });
          }
        }
        drawEverything();
        break;
      }
      case 'free-draw': {
        appendFreeDrawObject({
          id: createdObjectId,
          x: initialDrawingPositionRef.current.x,
          y: initialDrawingPositionRef.current.y,
          width: 0,
          height: 0,
          strokeColorHex: defaultParams.strokeColorHex,
          strokeWidth: 1,
          opacity: 100,
          freeDrawPoints: [
            {
              x: initialDrawingPositionRef.current.x,
              y: initialDrawingPositionRef.current.y,
            },
          ],
        });
        setActiveObjectId(createdObjectId);
        setActionMode({ type: 'isDrawing' });
        break;
      }
      case 'rectangle': {
        appendRectangleObject({
          id: createdObjectId,
          x: initialDrawingPositionRef.current.x,
          y: initialDrawingPositionRef.current.y,
          width: 0,
          height: 0,
          backgroundColorHex: defaultParams.backgroundColorHex,
          strokeColorHex: defaultParams.strokeColorHex,
          strokeWidth: 0,
          opacity: 100,
          borderRadius: 0,
        });
        setActiveObjectId(createdObjectId);
        setActionMode({ type: 'isDrawing' });
        break;
      }
      case 'ellipse': {
        appendEllipseObject({
          id: createdObjectId,
          x: initialDrawingPositionRef.current.x,
          y: initialDrawingPositionRef.current.y,
          width: 0,
          height: 0,
          backgroundColorHex: defaultParams.backgroundColorHex,
          strokeColorHex: defaultParams.strokeColorHex,
          strokeWidth: 0,
          opacity: 100,
          borderRadius: 0,
        });
        setActiveObjectId(createdObjectId);
        setActionMode({ type: 'isDrawing' });
        break;
      }
      case 'text': {
        appendTextObject({
          id: createdObjectId,
          x: initialDrawingPositionRef.current.x,
          y: initialDrawingPositionRef.current.y,
          width: 200,
          height: 100,
          text: 'Add text',
          textAlignHorizontal: 'center',
          textAlignVertical: 'middle',
          textJustify: false,
          fontColorHex: defaultParams.fontColorHex,
          fontSize: 44,
          fontFamily: 'sans-serif',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontVariant: 'normal',
          fontLineHeightRatio: 1,
          opacity: 100,
        });
        setActiveObjectId(createdObjectId);
        setUserMode('select');
        setActionMode(null);
        break;
      }
      default:
        break;
    }
  };

  // On pointer move

  const onPointerMove = (event: PointerOrTouchEvent) => {
    event.preventDefault();
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context || !actionMode) return;

    const clientX = 'clientX' in event ? event.clientX : event.touches[0]?.clientX;
    const clientY = 'clientY' in event ? event.clientY : event.touches[0]?.clientY;

    const finger0PageX = 'touches' in event ? event.touches[0]?.pageX : null;
    const finger0PageY = 'touches' in event ? event.touches[0]?.pageY : null;

    const finger1PageX = 'touches' in event ? event.touches[1]?.pageX : null;
    const finger1PageY = 'touches' in event ? event.touches[1]?.pageY : null;

    if (finger0PageX !== null && finger0PageY !== null && finger1PageX !== null && finger1PageY !== null) {
      const distanceBetweenTouches = Math.hypot(finger0PageX - finger1PageX, finger0PageY - finger1PageY);

      if (distanceBetweenTouchesRef.current) {
        if (distanceBetweenTouches > distanceBetweenTouchesRef.current) {
          incrementZoom(1);
        } else if (distanceBetweenTouches < distanceBetweenTouchesRef.current) {
          decrementZoom(1);
        }
      }

      distanceBetweenTouchesRef.current = distanceBetweenTouches;
    }

    const movementX =
      'movementX' in event
        ? event.movementX
        : previousTouchRef.current?.pageX
          ? event.touches[0].pageX - previousTouchRef.current.pageX
          : 0;

    const movementY =
      'movementY' in event
        ? event.movementY
        : previousTouchRef.current?.pageY
          ? event.touches[0].pageY - previousTouchRef.current.pageY
          : 0;

    if ('touches' in event) {
      previousTouchRef.current = event.touches[0];
    }

    const relativeMousePosition = getRelativeMousePositionOnCanvas({
      windowMouseX: clientX,
      windowMouseY: clientY,
      canvasWorkingSize,
      scrollPosition,
      zoom,
    });

    const finalX = relativeMousePosition.relativeMouseX;
    const finalY = relativeMousePosition.relativeMouseY;

    switch (userMode) {
      case 'select': {
        if (activeObjectId && actionMode.type === 'isMoving') {
          moveCanvasObject({
            id: activeObjectId,
            deltaPosition: {
              deltaX: movementX / (zoom / 100),
              deltaY: movementY / (zoom / 100),
            },
            canvasWorkingSize,
          });
        } else if (activeObjectId && actionMode.type === 'isResizing' && actionMode.option) {
          resizeCanvasObject({
            id: activeObjectId,
            actionModeOption: actionMode.option,
            delta: {
              deltaX: movementX / (zoom / 100),
              deltaY: movementY / (zoom / 100),
            },
            canvasWorkingSize,
          });
        } else if (actionMode.type === 'isPanning') {
          updateScrollPosition({
            deltaX: movementX,
            deltaY: movementY,
          });
        }
        break;
      }
      case 'free-draw': {
        if (activeObjectId) {
          appendFreeDrawPointToCanvasObject(activeObjectId, {
            x: finalX,
            y: finalY,
          });
        }
        break;
      }
      case 'rectangle':
      case 'ellipse': {
        if (activeObjectId) {
          const topLeftX = Math.min(initialDrawingPositionRef.current.x, finalX);
          const topLeftY = Math.min(initialDrawingPositionRef.current.y, finalY);

          const width = Math.abs(initialDrawingPositionRef.current.x - finalX);
          const height = Math.abs(initialDrawingPositionRef.current.y - finalY);

          updateCanvasObject(activeObjectId, {
            x: topLeftX,
            y: topLeftY,
            width,
            height,
          });
        }
        break;
      }
      default: {
        break;
      }
    }
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
    // const canvas = canvasRef.current;
    // const context = contextRef.current;
    // if (!canvas || !context) return;

    // previousTouchRef.current = null;
    // if ('touches' in event) {
    //   distanceBetweenTouchesRef.current = 0;
    // }

    // switch (userMode) {
    //   case 'select': {
    //     break;
    //   }
    //   case 'text': {
    //     break;
    //   }
    //   case 'free-draw': {
    //     context.closePath();
    //     if (activeObject) {
    //       const dimensions = getDimensionsFromFreeDraw({
    //         freeDrawObject: activeObject,
    //       });
    //       updateCanvasObject(activeObject.id, {
    //         width: dimensions.width,
    //         height: dimensions.height,
    //       });
    //     }
    //     setUserMode('select');
    //     drawEverything();
    //     break;
    //   }
    //   case 'rectangle':
    //   case 'ellipse': {
    //     setUserMode('select');
    //     drawEverything();
    //     break;
    //   }
    //   default: {
    //     break;
    //   }
    // }
  };
  const onKeyUp = (event: any) => {
    event.preventDefault();
    if (userMode != "boxCube") {
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
      {/* <canvas
        id={CANVAS_CONTROLS_OVERLAY}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${windowSize.width}px`,
          height: `${windowSize.height}px`,
          zIndex: theme.layers.canvasElement + 1,
        }}
        width={windowSize.width}
        height={windowSize.height}
      /> */}

      {/* <div
        style={{
          position: 'absolute',
          top: scrollPosition.y,
          left: scrollPosition.x,
          width: `${canvasWorkingSize.width}px`,
          height: `${canvasWorkingSize.height}px`,
          transform: `scale(${zoom / 100})`,
          zIndex: theme.layers.canvasElement,
          backgroundImage: `url(${TRANSPARENT_BACKGROUND_IMAGE})`,
          backgroundColor: 'white',
        }}
      >
        <h1
          style={{
            position: 'absolute',
            top: `${-38 / (zoom / 100)}px`,
            left: '0',
            width: `${Number.MAX_SAFE_INTEGER}px`,
            color: 'white',
            fontSize: `${20 / (zoom / 100)}px`,
          }}
        >
          {`${canvasWorkingSize.width} x ${canvasWorkingSize.height} px`}
        </h1>
        <canvas ref={canvasRef} width={canvasWorkingSize.width} height={canvasWorkingSize.height} />
      </div> */}

      <CanvasThree onKeyUp={onKeyUp} style={{ width: "100%", height: "100vh", background: "rgb(172,173,165)" }}>
        <OrbitControls minDistance={zoom / 4} maxDistance={zoom / 4} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} />
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
