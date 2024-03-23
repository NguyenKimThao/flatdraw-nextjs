import styled from '@emotion/styled';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import theme from '~/theme';

import { Input, Button, ActionIcon, Tooltip } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import useDefaultParams from '~/store/useDefaultParams';
import ControlHeader from '../components/ControlHeader';
import { NumberInput } from '@mantine/core';
import generateUniqueId from '~/utils/generateUniqueId';
import useActiveBoxGroupId from '~/store/useBoxGroupId';
import useUserMode from '~/store/useUserMode';
import useCanvasObjects from '~/store/useCanvasObjects';
import useActiveBoxLayerId from '~/store/useBoxLayerId';

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

  const activeBoxLayerId = useActiveBoxLayerId((state) => state.activeBoxLayerId);
  const boxLayerObjects = useCanvasObjects((state) => state.boxLayerObjects);

  const activeObject = boxLayerObjects.find((object) => object.id === activeBoxLayerId);

  if (!activeObject) {
    return null;
  }

  return (
    <>
      <ControlHeader title="Box Group" />
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
      <ActionsUl>
        <li>
          <Button
            leftIcon={<MdOutlineCreateNewFolder />}
            variant="default"
            size="xs"
            onClick={() => {
              const createdBoxGroupId = generateUniqueId();
              appendBoxGroupObject(activeObject.id, {
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
    </>
  );
}
