import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { Input, Button, PasswordInput } from '@mantine/core';
import useUserStore, { StatusAuthen } from '~/hooks/useUserStore';

const DivLogin = styled('div')`
  display: flex;
  width: 100%;
  height: 100vh;
  min-height: 400px;
  min-width: 600px;
  justify-content: center;
`;

const TabLogin = styled('div')`
  display: block;
  justify-content: center;
`;

const HeaderLogin = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 64px;
  margin-top: 20px;
`;

const H4 = styled('h4')`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 8px;
  margin-bottom: 4px;
  font-size: 1.9rem;
  color: white;
`;
const FieldInput = styled('div')`
  display: block;
  width: 300px;
  margin-bottom: 50px;
`;


export default function LoginLayout() {
  const statusAuthen = useUserStore((state) => state.statusAuthen);
  const errorAuthen = useUserStore((state) => state.errorAuthen);
  const login = useUserStore((state) => state.login);
  const [username, setUsername] = useState<string>("taonuaa004");
  const [passowrd, setPassword] = useState<string>("123456");

  useEffect(() => {

  }, []);

  const checkVaild = () => {
    return username && username.length >= 6 && passowrd && passowrd.length >= 6;
  }

  return (
    <DivLogin>
      <TabLogin>
        <HeaderLogin>Login</HeaderLogin>
        <FieldInput>
          <H4>
            Name
          </H4>
          <Input
            size="sm"
            radius="sm"
            name="username"
            placeholder="Enter My Name"
            value={username}
            onChange={(event) => {
              setUsername(event.currentTarget.value);
            }}
          />
        </FieldInput>
        <FieldInput>
          <H4>
            Password
          </H4>
          <PasswordInput
            size="sm"
            radius="sm"
            name="password"
            placeholder="Enter Password"
            error={errorAuthen}
            value={passowrd}
            onChange={(event) => {
              setPassword(event.currentTarget.value);
            }}
          />
        </FieldInput>
        <Button
          variant="gradient"
          size="xs"
          fullWidth
          loading={statusAuthen == StatusAuthen.AUTHENTING}
          loaderProps={{ type: 'dots' }}
          disabled={!checkVaild()}
          onClick={() => {
            login(username, passowrd)
          }}
        >
          Login
        </Button>
      </TabLogin>
    </DivLogin >
  );
}
