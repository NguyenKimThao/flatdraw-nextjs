import styled from '@emotion/styled';
import { Input, Button, ActionIcon, Tooltip, Textarea, NativeSelect } from '@mantine/core';
import { NumberInput } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { MdOutlineCreateNewFolder } from 'react-icons/md';

import useActiveBoxCubeId from '~/store/useBoxCubeId';
import useActiveBoxGroupId from '~/store/useBoxGroupId';
import useActiveBoxLayerId from '~/store/useBoxLayerId';
import useCanvasObjects from '~/store/useCanvasObjects';
import useDefaultParams from '~/store/useDefaultParams';
import useUserMode from '~/store/useUserMode';
import theme from '~/theme';
import generateUniqueId from '~/utils/generateUniqueId';

import ControlHeader from '../components/ControlHeader';
import useColorApi from '~/hooks/useColorApi';

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

export default function ColorsControl() {
  const defaultParams = useDefaultParams((state) => state.defaultParams);
  const setDefaultParams = useDefaultParams((state) => state.setDefaultParams);
  const colors = useColorApi((state) => state.colors);

  const colorSelect = Object.keys(colors)?.map((color) => ({
    value: colors[color].color,
    label: colors[color].label,
  })).reverse() || [];

  return (
    <>
      <ControlHeader title={'Colors'} />
      <ControlHeader title="Id" />
      <NativeSelect
        key={`idcolor-select`}
        size="xs"
        data={[
          { value: '', label: '(New)' },
          ...colorSelect,
        ]}
        value={defaultParams.color ? defaultParams.color.color : ''}
        onChange={(event) => {
          if (event.target.value == '') {
            setDefaultParams({ color: null });
          } else {
            setDefaultParams({ color: defaultParams.color });
          }
        }}
      />
      <ControlHeader title="Actions" />
      <ActionsUl>
        {/* {!activeObject && (
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
                    show: defaultParams.showBoxLayer != 'false'
                  });
                  setActiveBoxLayerId(createdBoxLayerId);
                  setDefaultParams({ positionBoxLayer: [0, 0, 0], nameBoxLayer: '', descriptionBoxLayer: '', showBoxLayer: 'true' });
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
                    show: defaultParams.showBoxLayer != 'false'
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
                  setActiveBoxCubeId(null);
                  setActiveBoxGroupId(null);
                  setActiveBoxLayerId(null);
                  setDefaultParams({ positionBoxLayer: [0, 0, 0], nameBoxLayer: '', descriptionBoxLayer: '', showBoxLayer: 'true' });
                  setUserMode('select');
                }}
              >
                No Active
              </Button>
            </li>
          </>
        )} */}
      </ActionsUl>
    </>
  );
}
