import styled from '@emotion/styled';
import React from 'react';
import { H4, TextP } from '../commonTabComponents';
import useUserStore from '~/hooks/useUserStore';
import { Button, TextInput } from '@mantine/core';
import { TbLogout } from 'react-icons/tb';

const PresetDiv = styled('div')`
  margin-bottom: 1rem;
`;

export default function MenuTabMyAccount() {
  const userStore = useUserStore((state) => state);
  return (
    <>
      <H4>My Account</H4>
      <PresetDiv>
        <TextInput label="Name" readOnly value={userStore?.name} />
        <TextInput label="Username" readOnly value={userStore?.username} />
        <TextInput label="Email" readOnly value={userStore?.email} />
      </PresetDiv>

      <H4>Logout Account</H4>
      <Button
        size="xs"
        variant="default"
        leftIcon={<TbLogout />}
        onClick={() => {
          userStore.logout()
        }}
      >
        Logout
      </Button>
    </>
  );
}
