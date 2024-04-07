import styled from '@emotion/styled';
import { ActionIcon, Tooltip, Text } from '@mantine/core';
import startCase from 'lodash/startCase';
import React, { useState } from 'react';
import { BiTrash, BiArchiveIn, BiArchiveOut, BiHide, BiShow } from 'react-icons/bi';
import { modals } from '@mantine/modals';

import useCanvasObjects from '~/store/useCanvasObjects';
import theme from '~/theme';

import { H4, TextP } from '../commonTabComponents';
import useActiveBoxLayerId from '~/store/useBoxLayerId';
import useCollectionApi from '~/hooks/useCollectionApi';

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
  grid-template-columns: 14px minmax(0, auto) minmax(0, 30px) minmax(0, 60px);
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

export default function MenuTabCollections() {
  const collectionId = useCollectionApi((state) => state.collectionId);
  const collections = useCollectionApi((state) => state.collections);
  const deleteCollection = useCollectionApi((state) => state.deleteCollection);


  const activeObject = collections?.find(e => e.id == collectionId);

  const openDeleteModal = (id: number) =>
    modals.openConfirmModal({
      title: 'Delete your collection',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete collection ? This action is destructive and you will have
          to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: 'Delete collection', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onConfirm: () => deleteCollection(id),
    });

  return (
    <>
      <H4>My Collections</H4>
      {collections.length === 0 ? (
        <TextP>You not collections found.</TextP>
      ) : (
        <LayersUl>
          {[...collections].reverse().map((object) => (
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
                {(!activeObject || activeObject.id != object.id) ? (
                  <div style={{ display: 'flex' }}>
                    <Tooltip label="Delete Collections">
                      <ActionIcon
                        onClick={() => {
                          openDeleteModal(object.id);
                        }}
                      >
                        <BiTrash />
                      </ActionIcon>
                    </Tooltip>
                  </div>
                ) : (
                  <div style={{ display: 'flex' }}></div>
                )}
                <div style={{ display: "flex" }}>
                  {(!activeObject || activeObject.id != object.id) && (
                    <Tooltip label="Open Box Layer">
                      <ActionIcon
                        onClick={() => {
                          // setActiveBoxLayerId(object.id);

                        }}
                      >
                        <BiArchiveIn />
                      </ActionIcon>
                    </Tooltip>
                  )}
                </div>
              </LayerLi>
            </Tooltip>
          ))}
        </LayersUl>
      )}
    </>
  );
}
