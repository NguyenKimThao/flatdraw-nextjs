import styled from '@emotion/styled';
import React, { useState } from 'react';
import { H4, TextP } from '../commonTabComponents';
import useUserStore from '~/hooks/useUserStore';
import { Button, TextInput, Textarea } from '@mantine/core';
import { TbLogout } from 'react-icons/tb';
import useCollectionApi from '~/hooks/useCollectionApi';
import { StatusFetch } from '~/config/types';

const PresetDiv = styled('div')`
  margin-bottom: 1rem;
`;

export default function MenuTabCreateCollection() {
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const createCollection = useCollectionApi((state) => state.createCollection);
  const status = useCollectionApi((state) => state.status);

  return (
    <>
      <H4>Create New Collection</H4>
      <PresetDiv>
        <TextInput
          size="sm"
          radius="sm"
          placeholder="Enter Collection Name"
          label="Name"
          name="collections"
          value={name}
          onChange={(event) => {
            setName(event.currentTarget.value);
          }} />
      </PresetDiv>
      <PresetDiv>
        <Textarea
          size="sm"
          radius="sm"
          label="Description"
          placeholder="description collection"
          value={desc}
          onChange={(event) => {
            setDesc(event.currentTarget.value);
          }}
        />
      </PresetDiv>
      <Button
        style={{ marginTop: 10 }}
        size="xs"
        variant="default"
        leftIcon={<TbLogout />}
        disabled={!name || name.length < 4}
        loading={status == StatusFetch.LOADING}
        onClick={() => {
          createCollection(name, desc);
        }}
      >
        Create
      </Button>
    </>
  );
}
