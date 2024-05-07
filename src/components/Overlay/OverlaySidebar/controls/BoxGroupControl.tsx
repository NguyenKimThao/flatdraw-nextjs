import styled from '@emotion/styled';
import { Input, Button, ActionIcon, Tooltip, Textarea, NativeSelect } from '@mantine/core';
import { NumberInput } from '@mantine/core';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineCreateNewFolder, MdControlPointDuplicate } from 'react-icons/md';

import { BoxCubeObject } from '~/config/types';
import useActiveBoxCubeId from '~/store/useBoxCubeId';
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
  const setActiveBoxCubeId = useActiveBoxCubeId((state) => state.setActiveBoxCubeId);
  const setUserMode = useUserMode((state) => state.setUserMode);
  const appendBoxGroupObject = useCanvasObjects((state) => state.appendBoxGroupObject);
  const updateBoxGroupObject = useCanvasObjects((state) => state.updateBoxGroupObject);
  const rotateBoxGroup = useCanvasObjects((state) => state.rotateBoxGroup);


  const activeBoxLayerId = useActiveBoxLayerId((state) => state.activeBoxLayerId);
  const activeBoxGroupId = useActiveBoxGroupId((state) => state.activeBoxGroupId);
  const boxLayerObjects = useCanvasObjects((state) => state.boxLayerObjects);


  const activeObjectLayer = boxLayerObjects?.find((object) => object.id === activeBoxLayerId);
  const activeObject = activeObjectLayer?.boxGroup?.find((object) => object.id === activeBoxGroupId);

  useEffect(() => {
    if (activeObject) {
      setDefaultParams({
        nameBoxGroup: activeObject.name,
        positionBoxGroup: activeObject.position,
        showBoxGroup: activeObject.show === false ? 'false' : 'true',
        descriptionBoxGroup: activeObject.description,
      });
    }
    return () => { }
  }, [activeObject, setDefaultParams]);

  if (!activeObjectLayer) {
    return null;
  }

  const boxGroupSelect = activeObjectLayer?.boxGroup?.map((boxLayer) => ({
    value: boxLayer.id,
    label: boxLayer.name,
  })).reverse() || [];

  return (
    <>
      <ControlHeader title={activeObject ? 'Edit Box Group' : 'Create Box Group'} />
      <ControlHeader title="Id" />
      <NativeSelect
        key={`idboxgroup-select`}
        size="xs"
        data={[
          { value: '', label: '(New)' },
          ...boxGroupSelect,
        ]}
        value={activeObject?.id}
        onChange={(event) => {
          if (event.target.value == '') {
            setActiveBoxGroupId(null)
            setDefaultParams({ positionBoxGroup: [0, 0, 0], nameBoxGroup: '', descriptionBoxGroup: '', showBoxGroup: 'true' });
          } else {
            setActiveBoxGroupId(event.target.value);
          }
        }}
      />

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
      <ControlHeader title="Show" />
      <NativeSelect
        key={`show-layer-select`}
        size="xs"
        data={[
          { value: 'true', label: 'True' },
          { value: 'false', label: 'False' },
        ]}
        value={defaultParams.showBoxLayer}
        onChange={(event) => {
          setDefaultParams({
            showBoxLayer: event.target.value,
          })
          if (activeObject) {
            // toggleShowCanvasBoxLayer(activeObject.id);
          }
        }}
      />
      <ControlHeader title="Description" />
      <Textarea
        size="xs"
        value={defaultParams.descriptionBoxGroup}
        onChange={(event) => {
          setDefaultParams({
            descriptionBoxGroup: event.target.value,
          });
        }}
      />
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
                  description: defaultParams.descriptionBoxGroup,
                  show: defaultParams.showBoxGroup != 'false',
                  type: 'boxGroup',
                });
                setActiveBoxGroupId(createdBoxGroupId);
                setDefaultParams({ positionBoxGroup: [0, 0, 0], nameBoxGroup: '', descriptionBoxGroup: '', showBoxGroup: 'true' });
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
                  description: defaultParams.descriptionBoxGroup,
                  show: defaultParams.showBoxGroup != 'false',
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
                const boxGroup: BoxCubeObject[] = [];
                activeObject?.boxGroup?.forEach(boxCube => {
                  boxGroup.push({
                    ..._.cloneDeep(boxCube),
                    id: generateUniqueId()
                  })
                });
                appendBoxGroupObject(activeObjectLayer?.id, {
                  ..._.cloneDeep(activeObject),
                  id: createdBoxGroupId,
                  position: [activeObject.position[0] + 2, activeObject.position[1] + 2, activeObject.position[2]],
                  name: activeObject.name + " Copy",
                  description: activeObject.description,
                  show: activeObject.show,
                  boxGroup: boxGroup
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
              leftIcon={<MdControlPointDuplicate />}
              variant="default"
              size="xs"
              onClick={() => {
                rotateBoxGroup(activeObjectLayer?.id, activeObject.id);
              }}
            >
              Rotate
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
                setDefaultParams({ positionBoxLayer: [0, 0, 0], nameBoxLayer: '', descriptionBoxLayer: '', showBoxLayer: 'true' });
                setUserMode('select');
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
