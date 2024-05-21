import styled from '@emotion/styled';
import { ActionIcon, Tooltip } from '@mantine/core';
import React from 'react';
import { FaPlus, FaMinus, FaRegHandshake, FaHands, FaEdit, FaShower } from 'react-icons/fa';
import { IoLocateSharp, IoSaveSharp, IoAddSharp } from 'react-icons/io5';

import useCanvasContext from '~/context/useCanvasContext';
import useCanvasCubeContext from '~/context/useCanvasContext/useCanvasCubeContext';
import useCollectionApi from '~/hooks/useCollectionApi';
import useLocalstogare from '~/hooks/useLocalstogare';
import ApiService from '~/service';
import useActionMode from '~/store/useActionMode';
import useCanvasObjects from '~/store/useCanvasObjects';
import useZoom from '~/store/useZoom';
import theme from '~/theme';

const Ul = styled('ul')`
  pointer-events: auto;
  width: 100%;
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(9, 45px);
  align-items: center;
  grid-gap: ${theme.variables.overlayItemsGutter};

  & > li {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default function OverlayZoom() {
  const { setCenter } = useCanvasContext();

  const zoom = useZoom((state) => state.zoom);
  const incrementZoom = useZoom((state) => state.incrementZoom);
  const decrementZoom = useZoom((state) => state.decrementZoom);
  const posY = useZoom((state) => state.posY);
  const posX = useZoom((state) => state.posX);
  const posZ = useZoom((state) => state.posZ);
  const incrementPosY = useZoom((state) => state.incrementPosY);
  const decrementPosY = useZoom((state) => state.decrementPosY);
  const setPosY = useZoom((state) => state.setPosY);
  const setPosX = useZoom((state) => state.setPosX);
  const incrementPosX = useZoom((state) => state.incrementPosX);
  const decrementPosX = useZoom((state) => state.decrementPosX);
  const setPosZ = useZoom((state) => state.setPosZ);
  const incrementPosZ = useZoom((state) => state.incrementPosZ);
  const decrementPosZ = useZoom((state) => state.decrementPosZ);
  const setZoom = useZoom((state) => state.setZoom);
  const { getBoxLayerObject, setBoxLayerObject } = useLocalstogare();
  const boxLayerObjects = useCanvasObjects((state) => state.boxLayerObjects);
  const setBoxLayerObjects = useCanvasObjects((state) => state.setBoxLayerObjects);
  const collectionId = useCollectionApi((state) => state.collectionId);
  const { canvasCubeRef, sceneRef, orbitControlRef } = useCanvasCubeContext();
  const actionMode = useActionMode((state) => state.actionMode);
  const setActionMode = useActionMode((state) => state.setActionMode);

  return (
    <Ul>
      <li>
        <Tooltip position="top" label="Decrement posY" offset={8}>
          <ActionIcon
            size="xl"
            variant="default"
            onClick={() => {
              if (sceneRef.current && sceneRef.current.parent) {
                sceneRef.current.parent.position.y = posY - 1;
              }
              decrementPosY(1);
            }}
          >
            <FaMinus />
          </ActionIcon>
        </Tooltip>
      </li>
      <li>
        <Tooltip position="top" label="Set default posY" offset={8}>
          <ActionIcon
            sx={{ width: '70px' }}
            size="xl"
            variant="default"
            onClick={() => {
              setPosY(0);
              if (sceneRef.current && sceneRef.current.parent) {
                sceneRef.current.parent.position.y = 0;
              }
            }}
          >
            {`Y: ${posY}`}
          </ActionIcon>
        </Tooltip>
      </li>
      <li>
        <Tooltip position="top" label="Increment posY" offset={8}>
          <ActionIcon
            size="xl"
            variant="default"
            onClick={() => {
              if (sceneRef.current && sceneRef.current.parent) {
                sceneRef.current.parent.position.y = posY + 1;
              }
              incrementPosY(1);
            }}
          >
            <FaPlus />
          </ActionIcon>
        </Tooltip>
      </li>
      <li>
        <Tooltip position="top" label="Decrement posX" offset={8}>
          <ActionIcon
            size="xl"
            variant="default"
            onClick={() => {
              if (sceneRef.current && sceneRef.current.parent) {
                sceneRef.current.parent.position.x = posX - 1;
              }
              decrementPosX(1);
            }}
          >
            <FaMinus />
          </ActionIcon>
        </Tooltip>
      </li>
      <li>
        <Tooltip position="top" label="Set default posX" offset={8}>
          <ActionIcon
            sx={{ width: '70px' }}
            size="xl"
            variant="default"
            onClick={() => {
              setPosX(0);
              if (sceneRef.current && sceneRef.current.parent) {
                sceneRef.current.parent.position.x = 0;
              }
            }}
          >
            {`X: ${posX}`}
          </ActionIcon>
        </Tooltip>
      </li>
      <li>
        <Tooltip position="top" label="Increment posX" offset={8}>
          <ActionIcon
            size="xl"
            variant="default"
            onClick={() => {
              if (sceneRef.current && sceneRef.current.parent) {
                sceneRef.current.parent.position.x = posX + 1;
              }
              incrementPosX(1);
            }}
          >
            <FaPlus />
          </ActionIcon>
        </Tooltip>
      </li>
      <li>
        <Tooltip position="top" label="Decrement posZ" offset={8}>
          <ActionIcon
            size="xl"
            variant="default"
            onClick={() => {
              if (sceneRef.current && sceneRef.current.parent) {
                sceneRef.current.parent.position.z = posZ - 1;
              }
              decrementPosZ(1);
            }}
          >
            <FaMinus />
          </ActionIcon>
        </Tooltip>
      </li>
      <li>
        <Tooltip position="top" label="Set default posZ" offset={8}>
          <ActionIcon
            sx={{ width: '70px' }}
            size="xl"
            variant="default"
            onClick={() => {
              setPosZ(0);
              if (sceneRef.current && sceneRef.current.parent) {
                sceneRef.current.parent.position.z = 0;
              }
            }}
          >
            {`Z: ${posZ}`}
          </ActionIcon>
        </Tooltip>
      </li>
      <li>
        <Tooltip position="top" label="Increment posZ" offset={8}>
          <ActionIcon
            size="xl"
            variant="default"
            onClick={() => {
              if (sceneRef.current && sceneRef.current.parent) {
                sceneRef.current.parent.position.z = posZ + 1;
              }
              incrementPosZ(1);
            }}
          >
            <FaPlus />
          </ActionIcon>
        </Tooltip>
      </li>
      <li>
        <Tooltip position="top" label="Save" offset={8}>
          <ActionIcon
            size="xl"
            variant="default"
            onClick={() => {
              if (collectionId && boxLayerObjects.length != 0) {
                ApiService.updatVersionLayers(collectionId, boxLayerObjects);
                setBoxLayerObject(collectionId, JSON.stringify(boxLayerObjects))
              }
            }}
          >
            <IoSaveSharp />
          </ActionIcon>
        </Tooltip>
      </li>
      {/* <li>
        <Tooltip position="top" label="Load" offset={8}>
          <ActionIcon
            size="xl"
            variant="default"
            onClick={() => {
              if (boxLayerObjects.length == 0) {
                let obj = getBoxLayerObject();
                console.log('obj', obj)
                setBoxLayerObjects(obj)
              }

            }}
          >
            <IoAddSharp />
          </ActionIcon>
        </Tooltip>
      </li> */}
      <li>
        <Tooltip position="top" label="Reset position" offset={8}>
          <ActionIcon
            size="xl"
            variant="default"
            onClick={() => {
              console.log('orbitControlRef.current', orbitControlRef.current);
              if (orbitControlRef.current) {
                orbitControlRef.current.reset();
              }
              if (sceneRef.current && sceneRef.current.parent) {
                sceneRef.current.parent.position.y = 0;
              }
            }}
          >
            <IoLocateSharp />
          </ActionIcon>
        </Tooltip>
      </li>
      <li>
        <Tooltip position="top" label="Decrement zoom" offset={8}>
          <ActionIcon
            size="xl"
            variant="default"
            onClick={() => {
              decrementZoom(5);
            }}
          >
            <FaMinus />
          </ActionIcon>
        </Tooltip>
      </li>
      <li>
        <Tooltip position="top" label="Set default zoom" offset={8}>
          <ActionIcon
            sx={{ width: '70px' }}
            size="xl"
            variant="default"
            onClick={() => {
              setZoom(100);
            }}
          >
            {`${Math.trunc(Math.abs(zoom))}%`}
          </ActionIcon>
        </Tooltip>
      </li>
      <li>
        <Tooltip position="top" label="Increment zoom" offset={8}>
          <ActionIcon
            size="xl"
            variant="default"
            onClick={() => {
              incrementZoom(5);
            }}
          >
            <FaPlus />
          </ActionIcon>
        </Tooltip>
      </li>
      <li>
        <Tooltip position="top" label="Action Mode" offset={8}>
          <ActionIcon
            size="xl"
            variant="default"
            onClick={() => {
              // incrementZoom(5);
              if (actionMode?.type == 'isPanning') {
                setActionMode(null);
              } else {
                setActionMode({
                  type: 'isPanning'
                });
              }

            }}
          >
            {actionMode?.type == 'isPanning' ? <FaShower /> : <FaEdit />}
          </ActionIcon>
        </Tooltip>
      </li>
    </Ul>
  );
}
