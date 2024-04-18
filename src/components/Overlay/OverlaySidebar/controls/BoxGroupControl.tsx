import styled from '@emotion/styled';
import { Input, Button, ActionIcon, Tooltip } from '@mantine/core';
import { NumberInput } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { MdOutlineCreateNewFolder, MdControlPointDuplicate } from 'react-icons/md';

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

export default function BoxGroupControl() {
  const defaultParams = useDefaultParams((state) => state.defaultParams);
  const setDefaultParams = useDefaultParams((state) => state.setDefaultParams);
  const setActiveBoxGroupId = useActiveBoxGroupId((state) => state.setActiveBoxGroupId);
  const setUserMode = useUserMode((state) => state.setUserMode);
  const appendBoxGroupObject = useCanvasObjects((state) => state.appendBoxGroupObject);
  const updateBoxGroupObject = useCanvasObjects((state) => state.updateBoxGroupObject);


  const activeBoxLayerId = useActiveBoxLayerId((state) => state.activeBoxLayerId);
  const activeBoxGroupId = useActiveBoxGroupId((state) => state.activeBoxGroupId);
  const boxLayerObjects = useCanvasObjects((state) => state.boxLayerObjects);

  const activeObjectLayer = boxLayerObjects?.find((object) => object.id === activeBoxLayerId);
  const activeObject = activeObjectLayer?.boxGroup?.find((object) => object.id === activeBoxGroupId);

  if (!activeObjectLayer) {
    return null;
  }

  useEffect(() => {
    if (activeObject) {
      setDefaultParams({
        nameBoxGroup: activeObject.name,
        positionBoxGroup: activeObject.position,
      });
    }
  }, [activeObject]);

  return (
    <>
      <ControlHeader title={activeObject ? 'Edit Box Group' : 'Create Box Group'} />
      <ControlHeader title="Name" />
      <Input
        size="xs"
        type="search"
        placeholder="Name"
        value={defaultParams.nameBoxGroup}
        onChange={(event) => {
          setDefaultParams({
            nameBoxGroup: event.currentTarget.value,
          });
        }}
      />
      <ControlHeader title="Position" />
      <FrameGridDiv>
        <NumberInput
          size="xs"
          style={{ width: '100%' }}
          value={Math.trunc(defaultParams.positionBoxGroup[0])}
          onChange={(value: number) => {
            setDefaultParams({
              positionBoxGroup: [value, defaultParams.positionBoxGroup[1], defaultParams.positionBoxGroup[2]],
            });
          }}
          icon={<span style={{ fontSize: '12px' }}>{'X'}</span>}
          hideControls
        />
        <NumberInput
          size="xs"
          style={{ width: '100%' }}
          value={Math.trunc(defaultParams.positionBoxGroup[1])}
          onChange={(value: number) => {
            setDefaultParams({
              positionBoxGroup: [defaultParams.positionBoxGroup[0], value, defaultParams.positionBoxGroup[2]],
            });
          }}
          icon={<span style={{ fontSize: '12px' }}>{'Y'}</span>}
          hideControls
        />
        <NumberInput
          size="xs"
          style={{ width: '100%' }}
          value={Math.trunc(defaultParams.positionBoxGroup[2])}
          onChange={(value: number) => {
            setDefaultParams({
              positionBoxGroup: [defaultParams.positionBoxGroup[0], defaultParams.positionBoxGroup[1], value],
            });
          }}
          icon={<span style={{ fontSize: '12px' }}>{'Z'}</span>}
          hideControls
        />
      </FrameGridDiv>
      <ControlHeader title="Actions" />
      {!activeObject &&
        <ActionsUl>
          <li>
            <Button
              leftIcon={<MdOutlineCreateNewFolder />}
              variant="default"
              size="xs"
              onClick={() => {
                const createdBoxGroupId = generateUniqueId();
                appendBoxGroupObject(activeObjectLayer?.id, {
                  id: createdBoxGroupId,
                  position: defaultParams.positionBoxGroup,
                  name: defaultParams.nameBoxGroup,
                  type: 'boxGroup',
                });
                setActiveBoxGroupId(createdBoxGroupId);
                setDefaultParams({ positionBoxGroup: [0, 0, 0], nameBoxGroup: '' });
                setUserMode('select');
              }}
            >
              Create
            </Button>
          </li>
        </ActionsUl>
      }
      {activeObject &&
        <ActionsUl>
          <li>
            <Button
              leftIcon={<MdOutlineCreateNewFolder />}
              variant="default"
              size="xs"
              onClick={() => {
                updateBoxGroupObject(activeObjectLayer?.id, {
                  ...activeObject,
                  position: defaultParams.positionBoxGroup,
                  name: defaultParams.nameBoxGroup,
                  type: 'boxGroup',
                });
              }}
            >
              Update
            </Button>
          </li>
          <li>
            <Button
              leftIcon={<MdControlPointDuplicate />}
              variant="default"
              size="xs"
              onClick={() => {
                const createdBoxGroupId = generateUniqueId();
                appendBoxGroupObject(activeObjectLayer?.id, {
                  id: createdBoxGroupId,
                  position: [activeObject.position[0] + 5, activeObject.position[1] + 5, activeObject.position[2]],
                  name: activeObject.name,
                  type: 'boxGroup',
                });
                setActiveBoxGroupId(createdBoxGroupId);
                setUserMode('select');
              }}
            >
              Duplicate
            </Button>
          </li>
          <li>
            <Button
              leftIcon={<MdOutlineCreateNewFolder />}
              variant="default"
              size="xs"
              onClick={() => {
                setActiveBoxGroupId(null);
              }}
            >
              No Active
            </Button>
          </li>
        </ActionsUl>
      }
    </>
  );
}
