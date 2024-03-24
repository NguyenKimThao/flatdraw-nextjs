import styled from '@emotion/styled';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import theme from '~/theme';

import { Input, Button, ActionIcon, Tooltip, NativeSelect } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import useDefaultParams from '~/store/useDefaultParams';
import ControlHeader from '../components/ControlHeader';
import { NumberInput } from '@mantine/core';
import generateUniqueId from '~/utils/generateUniqueId';
import useActiveBoxGroupId from '~/store/useBoxGroupId';
import useUserMode from '~/store/useUserMode';
import useCanvasObjects from '~/store/useCanvasObjects';
import useActiveBoxLayerId from '~/store/useBoxLayerId';
import useActiveBoxCubeId from '~/store/useBoxCubeId';


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


  const setActiveBoxCubeId = useActiveBoxCubeId((state) => state.setActiveBoxCubeId);

  const activeBoxLayerId = useActiveBoxLayerId((state) => state.activeBoxLayerId);
  const activeBoxGroupId = useActiveBoxGroupId((state) => state.activeBoxGroupId);
  const activeBoxCubeId = useActiveBoxCubeId((state) => state.activeBoxCubeId);
  const boxLayerObjects = useCanvasObjects((state) => state.boxLayerObjects);
  console.log('activeObjectGroup', activeBoxGroupId, boxLayerObjects)

  const activeObjectLayer = boxLayerObjects?.find((object) => object.id === activeBoxLayerId);
  const activeObjectGroup = activeObjectLayer?.boxGroup?.find((object) => object.id === activeBoxGroupId);
  const activeObject = activeObjectGroup?.boxGroup?.find(object => object.id == activeBoxCubeId);
  const boxGroup = activeObjectGroup?.boxGroup || [];


  if (!activeObjectLayer || !activeObjectGroup) {
    return null;
  }

  useEffect(() => {
    if (activeObjectGroup) {
      let activeObjectCurrent = activeObjectGroup.boxGroup?.find(object => object.id == activeBoxCubeId);
      if (activeObjectCurrent) {
        setDefaultParams({
          positionBoxCube: activeObjectCurrent.position,
          nameBoxCube: activeObjectCurrent.name,
          countBoxCube: activeObjectCurrent.count + "",
          docBoxCube: activeObjectCurrent.doc + "",
          colorBoxCube: activeObjectCurrent.color,
        });
      }
    }
  }, [activeObjectGroup]);

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
        key={`idboxcube-selec`}
        size="xs"
        data={[
          { value: 'white', label: 'Trang' },
          { value: 'black', label: 'Den' },
        ]}
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
                type: 'boxCube',
              });
              setActiveBoxCubeId(createdBoxCubeId);
              setDefaultParams({ positionBoxCube: [0, 0, 0] });
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
                  count: parseInt(defaultParams.countBoxCube),
                  doc: parseInt(defaultParams.docBoxCube),
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
