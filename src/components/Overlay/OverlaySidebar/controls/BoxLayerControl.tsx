import styled from '@emotion/styled';
import { Input, Button, ActionIcon, Tooltip, Textarea } from '@mantine/core';
import { NumberInput } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { MdOutlineCreateNewFolder } from 'react-icons/md';

import useActiveBoxGroupId from '~/store/useBoxGroupId';
import useActiveBoxLayerId from '~/store/useBoxLayerId';
import useCanvasObjects from '~/store/useCanvasObjects';
import useDefaultParams from '~/store/useDefaultParams';
import useUserMode from '~/store/useUserMode';
import theme from '~/theme';
import generateUniqueId from '~/utils/generateUniqueId';

import ControlHeader from '../components/ControlHeader';



const FrameGridDiv = styled('div')`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: ${theme.variables.sidebarGutter};
`;

const ActionsUl = styled('ul')`
  list-style: none;
  padding: 0;
  display: inline-grid;
  grid-template-columns: repeat(2, minmax(0, auto));
  grid-gap: 6px;
`;

export default function BoxLayerControl() {
  const defaultParams = useDefaultParams((state) => state.defaultParams);
  const setDefaultParams = useDefaultParams((state) => state.setDefaultParams);
  const setActiveBoxLayerId = useActiveBoxLayerId((state) => state.setActiveBoxLayerId);
  const setUserMode = useUserMode((state) => state.setUserMode);
  const appendBoxLayerObject = useCanvasObjects((state) => state.appendBoxLayerObject);
  const updateBoxLayerObject = useCanvasObjects((state) => state.updateBoxLayerObject);
  const setActiveBoxGroupId = useActiveBoxGroupId((state) => state.setActiveBoxGroupId);

  const activeBoxLayerId = useActiveBoxLayerId((state) => state.activeBoxLayerId);
  const boxLayerObjects = useCanvasObjects((state) => state.boxLayerObjects);
  const activeObject = boxLayerObjects.find((object) => object.id === activeBoxLayerId);
  useEffect(() => {
    if (activeObject) {
      setDefaultParams({
        nameBoxLayer: activeObject.name,
        positionBoxLayer: activeObject.position,
        descriptionBoxLayer: activeObject.description
      });
    }
  }, [activeObject]);

  return (
    <>
      <ControlHeader title={activeObject ? 'Edit Box Layer' : 'Create Box Layer'} />
      <ControlHeader title="Name" />
      <Input
        size="xs"
        type="search"
        placeholder="Name"
        value={defaultParams.nameBoxLayer}
        onChange={(event) => {
          setDefaultParams({
            nameBoxLayer: event.currentTarget.value,
          });
        }}
      />
      <ControlHeader title="Position" />
      <FrameGridDiv>
        <NumberInput
          size="xs"
          style={{ width: '100%' }}
          value={Math.trunc(defaultParams.positionBoxLayer[0])}
          onChange={(value: number) => {
            setDefaultParams({
              positionBoxLayer: [value, defaultParams.positionBoxLayer[1], defaultParams.positionBoxLayer[2]],
            });
          }}
          icon={<span style={{ fontSize: '12px' }}>{'X'}</span>}
          hideControls
        />
        <NumberInput
          size="xs"
          style={{ width: '100%' }}
          value={Math.trunc(defaultParams.positionBoxLayer[1])}
          onChange={(value: number) => {
            setDefaultParams({
              positionBoxLayer: [defaultParams.positionBoxLayer[0], value, defaultParams.positionBoxLayer[2]],
            });
          }}
          icon={<span style={{ fontSize: '12px' }}>{'Y'}</span>}
          hideControls
        />
        <NumberInput
          size="xs"
          style={{ width: '100%' }}
          value={Math.trunc(defaultParams.positionBoxLayer[2])}
          onChange={(value: number) => {
            setDefaultParams({
              positionBoxLayer: [defaultParams.positionBoxLayer[0], defaultParams.positionBoxLayer[1], value],
            });
          }}
          icon={<span style={{ fontSize: '12px' }}>{'Z'}</span>}
          hideControls
        />
      </FrameGridDiv>
      <ControlHeader title="Description" />
      <Textarea
        size="xs"
        value={defaultParams.descriptionBoxLayer}
        onChange={(event) => {
          setDefaultParams({
            descriptionBoxLayer: event.target.value,
          });
        }}
      />
      <ControlHeader title="Actions" />
      <ActionsUl>
        {!activeObject && (
          <>
            <li>
              <Button
                leftIcon={<MdOutlineCreateNewFolder />}
                variant="default"
                size="xs"
                onClick={() => {
                  const createdBoxLayerId = generateUniqueId();
                  appendBoxLayerObject({
                    id: createdBoxLayerId,
                    position: defaultParams.positionBoxLayer,
                    name: defaultParams.nameBoxLayer,
                    description: defaultParams.descriptionBoxLayer,
                    show: true
                  });
                  setActiveBoxLayerId(createdBoxLayerId);
                  setDefaultParams({ positionBoxLayer: [0, 0, 0], nameBoxLayer: '', descriptionBoxLayer: '' });
                  setUserMode('select');
                }}
              >
                Create
              </Button>
            </li>
          </>
        )}
        {activeObject && (
          <>
            <li>
              <Button
                leftIcon={<MdOutlineCreateNewFolder />}
                variant="default"
                size="xs"
                onClick={() => {
                  updateBoxLayerObject(activeObject.id, {
                    ...activeObject,
                    position: defaultParams.positionBoxLayer,
                    name: defaultParams.nameBoxLayer,
                    description: defaultParams.descriptionBoxLayer,
                  });
                  setUserMode('select');
                }}
              >
                Edit
              </Button>
            </li>
            <li>
              <Button
                leftIcon={<MdOutlineCreateNewFolder />}
                variant="default"
                size="xs"
                onClick={() => {
                  setActiveBoxGroupId(null);
                  setActiveBoxLayerId(null);
                  setUserMode('select');
                }}
              >
                No Active
              </Button>
            </li>
          </>
        )}
      </ActionsUl>
    </>
  );
}
