import styled from '@emotion/styled';
import { Input, Button, PasswordInput } from '@mantine/core';
import React, { useEffect, useState } from 'react';

import useUserStore, { StatusAuthen } from '~/hooks/useUserStore';

export default function LogoutLayout() {
  const statusAuthen = useUserStore((state) => state.statusAuthen);
  useEffect(() => {

  }, []);

  return (
    <></>
  );
}
