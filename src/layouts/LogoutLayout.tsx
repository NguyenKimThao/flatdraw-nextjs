import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { Input, Button, PasswordInput } from '@mantine/core';
import useUserStore, { StatusAuthen } from '~/hooks/useUserStore';

export default function LogoutLayout() {
  const statusAuthen = useUserStore((state) => state.statusAuthen);
  useEffect(() => {

  }, []);

  return (
    <></>
  );
}
