import styled from '@emotion/styled';
import { Input, Button, ActionIcon, Tooltip, NativeSelect, Textarea } from '@mantine/core';
import { NumberInput } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { MdOutlineCreateNewFolder } from 'react-icons/md';

import useAvailableColors from '~/store/useAvailableColors';
import useActiveBoxCubeId from '~/store/useBoxCubeId';
import useActiveBoxGroupId from '~/store/useBoxGroupId';
import useActiveBoxLayerId from '~/store/useBoxLayerId';
import useCanvasObjects from '~/store/useCanvasObjects';
import useDefaultParams from '~/store/useDefaultParams';
import useUserMode from '~/store/useUserMode';
import theme from '~/theme';
import generateUniqueId from '~/utils/generateUniqueId';
import getAvailableColor from '~/utils/getAvailableColor';

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

const TextParamsGrid = styled('div')`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: ${theme.variables.sidebarGutter};
`;

export default function BoxCubeControl() {
  const defaultParams = useDefaultParams((state) => state.defaultParams);
  const setDefaultParams = useDefaultParams((state) => state.setDefaultParams);
  const setUserMode = useUserMode((state) => state.setUserMode);
  const appendBoxCubeObject = useCanvasObjects((state) => state.appendBoxCubeObject);
  const updateBoxCubeObject = useCanvasObjects((state) => state.updateBoxCubeObject);
  const removeBoxCubeObject = useCanvasObjects((state) => state.removeBoxCubeObject);
  const availableColors = useAvailableColors((state) => state.availableColors);

  const setActiveBoxCubeId = useActiveBoxCubeId((state) => state.setActiveBoxCubeId);

  const activeBoxLayerId = useActiveBoxLayerId((state) => state.activeBoxLayerId);
  const activeBoxGroupId = useActiveBoxGroupId((state) => state.activeBoxGroupId);
  const activeBoxCubeId = useActiveBoxCubeId((state) => state.activeBoxCubeId);
  const boxLayerObjects = useCanvasObjects((state) => state.boxLayerObjects);

  const activeObjectLayer = boxLayerObjects?.find((object) => object.id === activeBoxLayerId);
  const activeObjectGroup = activeObjectLayer?.boxGroup?.find((object) => object.id === activeBoxGroupId);
  const activeObject = activeObjectGroup?.boxGroup?.find(object => object.id == activeBoxCubeId);
  const boxGroup = activeObjectGroup?.boxGroup || [];


  if (!activeObjectLayer || !activeObjectGroup) {
    return null;
  }

  useEffect(() => {
    if (activeObjectGroup) {
      if (activeObject) {
        setDefaultParams({
          positionBoxCube: activeObject.position,
          nameBoxCube: activeObject.name,
          countBoxCube: activeObject.count + "",
          docBoxCube: activeObject.doc + "",
          colorBoxCube: activeObject.color,
        });
      }
    }
  }, [activeObjectGroup, activeObject]);

  return (
    <>
      <ControlHeader title="Box Cube" />
      <ControlHeader title="Id" />
      <NativeSelect
        key={`idboxcube-select`}
        size="xs"
        data={[
          { value: '', label: '(New)' },
          ...boxGroup?.map((fontFamily) => ({
            value: fontFamily.id,
            label: fontFamily.name,
          })),
        ]}
        value={activeObject?.id}
        onChange={(event) => {
          if (event.target.value == '') {
            setActiveBoxCubeId(null)
            setDefaultParams({ positionBoxCube: [0, 0, 0], nameBoxCube: '' });
          } else {
            setActiveBoxCubeId(event.target.value)
          }
        }}
      />
      <ControlHeader title="Name" />
      <Input
        size="xs"
        type="search"
        placeholder="Name"
        value={defaultParams.nameBoxCube}
        onChange={(event) => {
          setDefaultParams({
            nameBoxCube: event.currentTarget.value,
          });
        }}
      />
      <ControlHeader title="Color" />
      <NativeSelect
        key={`color-cube-select`}
        size="xs"
        data={Object.keys(availableColors).map(e => {
          return {
            'value': e,
            'label': availableColors[e].label,
          }
        })}
        value={defaultParams?.colorBoxCube}
        onChange={(event) => {
          setDefaultParams({
            ...defaultParams,
            colorBoxCube: event.target.value,
          })
        }}
      />
      <ControlHeader title="Count" />
      <NativeSelect
        key={`count-cube-select-${defaultParams.countBoxCube}`}
        size="xs"
        data={[
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3', label: '3' },
        ]}
        value={defaultParams.countBoxCube}
        onChange={(event) => {
          setDefaultParams({
            ...defaultParams,
            countBoxCube: event.target.value,
          })
        }}
      />
      <ControlHeader title="Doc" />
      <NativeSelect
        key={`doc-select-${defaultParams.docBoxCube}`}
        size="xs"
        data={[
          { value: '0', label: '0' },
          { value: '1', label: '1' },
        ]}
        value={defaultParams.docBoxCube}
        onChange={(event) => {
          setDefaultParams({
            ...defaultParams,
            docBoxCube: event.target.value,
          })
        }}
      />
      <ControlHeader title="Position" />
      <FrameGridDiv>
        <NumberInput
          size="xs"
          style={{ width: '100%' }}
          value={Math.trunc(defaultParams.positionBoxCube[0])}
          onChange={(value: number) => {
            setDefaultParams({
              ...defaultParams,
              positionBoxCube: [value, defaultParams.positionBoxCube[1], defaultParams.positionBoxCube[2]],
            });
          }}
          icon={<span style={{ fontSize: '12px' }}>{'X'}</span>}
          hideControls
        />
        <NumberInput
          size="xs"
          style={{ width: '100%' }}
          value={Math.trunc(defaultParams.positionBoxCube[1])}
          onChange={(value: number) => {
            setDefaultParams({
              ...defaultParams,
              positionBoxCube: [defaultParams.positionBoxCube[0], value, defaultParams.positionBoxCube[2]],
            });
          }}
          icon={<span style={{ fontSize: '12px' }}>{'Y'}</span>}
          hideControls
        />
        <NumberInput
          size="xs"
          style={{ width: '100%' }}
          value={Math.trunc(defaultParams.positionBoxCube[2])}
          onChange={(value: number) => {
            setDefaultParams({
              ...defaultParams,
              positionBoxCube: [defaultParams.positionBoxCube[0], defaultParams.positionBoxCube[1], value],
            });
          }}
          icon={<span style={{ fontSize: '12px' }}>{'Z'}</span>}
          hideControls
        />
      </FrameGridDiv>
      <ControlHeader title="Description" />
      <Textarea
        size="xs"
        value={defaultParams.descriptionBoxCube}
        onChange={(event) => {
          setDefaultParams({
            descriptionBoxCube: event.target.value,
          });
        }}
      />
      <ControlHeader title="Actions" />
      <ActionsUl>
        <li>
          <Button
            leftIcon={<MdOutlineCreateNewFolder />}
            variant="default"
            size="xs"
            onClick={() => {
              const createdBoxCubeId = generateUniqueId();
              appendBoxCubeObject(activeObjectLayer.id, activeObjectGroup.id, {
                id: createdBoxCubeId,
                position: defaultParams.positionBoxCube,
                name: defaultParams.nameBoxCube,
                boxGroupId: activeObjectGroup.id,
                color: defaultParams.colorBoxCube,
                count: parseInt(defaultParams.countBoxCube) || 0,
                doc: parseInt(defaultParams.docBoxCube) || 0,
                description: defaultParams.descriptionBoxCube || '',
                type: 'boxCube',
              });
              setActiveBoxCubeId(createdBoxCubeId);
              setDefaultParams({ positionBoxCube: [0, 0, 0], nameBoxCube: '', descriptionBoxCube: '' });
              setUserMode('select');
            }}
          >
            Create
          </Button>
        </li>
      </ActionsUl>

      {activeObject && (<>
        <ControlHeader title="Actions" />
        <ActionsUl>
          <li>
            <Button
              leftIcon={<MdOutlineCreateNewFolder />}
              variant="default"
              size="xs"
              onClick={() => {
                updateBoxCubeObject(activeObjectLayer.id, activeObjectGroup.id, {
                  id: activeObject.id,
                  position: defaultParams.positionBoxCube,
                  name: defaultParams.nameBoxCube,
                  boxGroupId: activeObjectGroup.id,
                  color: defaultParams.colorBoxCube,
                  count: parseInt(defaultParams.countBoxCube) || 0,
                  doc: parseInt(defaultParams.docBoxCube) || 0,
                  description: defaultParams.descriptionBoxCube || '',
                  type: 'boxCube',
                });
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
                removeBoxCubeObject(activeObjectLayer.id, activeObjectGroup.id, activeObject.id);
                setActiveBoxCubeId(null);
                setDefaultParams({ positionBoxCube: [0, 0, 0], nameBoxCube: '', descriptionBoxCube: '' });
              }}
            >
              Remove
            </Button>
          </li>
          <li>
            <Button
              leftIcon={<MdOutlineCreateNewFolder />}
              variant="default"
              size="xs"
              onClick={() => {
                setActiveBoxCubeId(null);
              }}
            >
              No Active
            </Button>
          </li>
        </ActionsUl>
      </>)}
    </>
  );
}
