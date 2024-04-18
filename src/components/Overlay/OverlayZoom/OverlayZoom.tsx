import styled from '@emotion/styled';
import { ActionIcon, Tooltip } from '@mantine/core';
import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { IoLocateSharp, IoSaveSharp, IoAddSharp } from 'react-icons/io5';

import useCanvasContext from '~/context/useCanvasContext';
import useCanvasCubeContext from '~/context/useCanvasContext/useCanvasCubeContext';
import useCollectionApi from '~/hooks/useCollectionApi';
import useLocalstogare from '~/hooks/useLocalstogare';
import ApiService from '~/service';
import useCanvasObjects from '~/store/useCanvasObjects';
import useZoom from '~/store/useZoom';
import theme from '~/theme';

const Ul = styled('ul')`
  pointer-events: auto;
  width: 100%;
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, auto));
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
  const setZoom = useZoom((state) => state.setZoom);
  const { getBoxLayerObject, setBoxLayerObject } = useLocalstogare();
  const boxLayerObjects = useCanvasObjects((state) => state.boxLayerObjects);
  const setBoxLayerObjects = useCanvasObjects((state) => state.setBoxLayerObjects);
  const collectionId = useCollectionApi((state) => state.collectionId);
  const { canvasCubeRef, orbitControlRef } = useCanvasCubeContext();

  return (
    <Ul>
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
    </Ul>
  );
}
