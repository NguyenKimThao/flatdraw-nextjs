import styled from '@emotion/styled';
import { ActionIcon, Tooltip } from '@mantine/core';
import startCase from 'lodash/startCase';
import React from 'react';
import { BiTrash, BiArchiveIn, BiArchiveOut } from 'react-icons/bi';

import useCanvasObjects from '~/store/useCanvasObjects';
import theme from '~/theme';

import { H4, TextP } from '../commonTabComponents';
import useActiveBoxLayerId from '~/store/useBoxLayerId';
import useActiveBoxGroupId from '~/store/useBoxGroupId';

const LayersUl = styled('ul')`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.75rem;
`;

const LayerLi = styled('li')`
  border: 1px solid var(--color-borderPrimary);
  border-radius: 5px;
  overflow: hidden;
  padding: 0.6rem 0.2rem 0.6rem 0.6rem;
  display: grid;
  grid-template-columns: 14px minmax(0, auto) minmax(0, 1fr) minmax(0, 30px);
  grid-gap: 0.5rem;
  align-items: center;
  cursor: help;

  ${theme.medias.gteMedium} {
    padding: 0.9rem 0.5rem 0.9rem 0.9rem;
    grid-gap: 0.5rem;
  }

  & > span:first-of-type {
    display: block;
    width: 14px;
    height: 14px;
  }

  & > b:first-of-type {
    font-size: 0.8rem;

    ${theme.medias.gteMedium} {
      font-size: 1rem;
    }
  }

  & > p:last-of-type {
    margin-bottom: 0;
    font-size: 0.9rem;
  }
`;

export default function MenuTabBoxGroups() {
  const activeBoxLayerId = useActiveBoxLayerId((state) => state.activeBoxLayerId);
  const activeBoxGroupId = useActiveBoxGroupId((state) => state.activeBoxGroupId);
  const boxLayerObjects = useCanvasObjects((state) => state.boxLayerObjects);
  const deleteCanvasBoxLayer = useCanvasObjects((state) => state.deleteCanvasBoxLayer);
  const deleteCanvasBoxGroup = useCanvasObjects((state) => state.deleteCanvasBoxGroup);
  const setActiveBoxGroupId = useActiveBoxGroupId((state) => state.setActiveBoxGroupId);
  const activeObjectLayer = boxLayerObjects?.find((object) => object.id === activeBoxLayerId);
  const activeObject = activeObjectLayer?.boxGroup?.find((object) => object.id === activeBoxGroupId);

  return (
    <>
      <H4>Box Groups</H4>
      {!activeObjectLayer || activeObjectLayer.boxGroup?.length == 0 ? (
        <TextP>No objects found.</TextP>
      ) : (
        <LayersUl>
          {[...activeObjectLayer.boxGroup].reverse().map((object) => (
            <Tooltip
              key={object.id}
              position="bottom-start"
              withArrow
              arrowSize={8}
              arrowOffset={20}
              label={
                <div>
                  <b>Name:</b> {object.name}
                  <br />
                  <b>Position:</b> {Math.trunc(object.position[0])}, {Math.trunc(object.position[1])},{' '}
                  {Math.trunc(object.position[2])}
                  <br />
                </div>
              }
            >
              <LayerLi>
                <span
                  style={{
                    background: activeObject && activeObject.id == object.id ? 'blue' : 'red',
                  }}
                />
                <b>{startCase(object.name)}</b>
                {!activeObject || activeObject.id != object.id ? (
                  <>
                    <Tooltip label="Delete Box Group">
                      <ActionIcon
                        onClick={() => {
                          console.log('object.id, activeObjectLayer.id', object.id, activeObjectLayer.id)
                          deleteCanvasBoxGroup(object.id, activeObjectLayer.id);
                        }}
                      >
                        <BiTrash />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Active Box Group">
                      <ActionIcon
                        onClick={() => {
                          setActiveBoxGroupId(object.id);
                        }}
                      >
                        <BiArchiveIn />
                      </ActionIcon>
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <Tooltip label="Deative Box Group">
                      <ActionIcon
                        onClick={() => {
                          setActiveBoxGroupId(null);
                        }}
                      >
                        <BiArchiveOut />
                      </ActionIcon>
                    </Tooltip>
                  </>
                )}
              </LayerLi>
            </Tooltip>
          ))}
        </LayersUl>
      )}
    </>
  );
}
