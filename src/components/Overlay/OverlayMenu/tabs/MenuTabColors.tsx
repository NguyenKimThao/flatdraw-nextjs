import styled from '@emotion/styled';
import { Button, NativeSelect } from '@mantine/core';
import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

import ColorPicker from '~/components/ColorPicker';
import ColorPickerElement from '~/components/ColorPicker/ColorPickerElement';
import { COLOR_PICKERS } from '~/config/constants';
import type { ColorPickerType } from '~/config/types';
import useColorSchemeContext from '~/context/useColorSchemeContext';
import useColorParams from '~/store/useColorParams';

import { H4, TextP } from '../commonTabComponents';
const BackgroundColorDiv = styled('div')`
  margin-top: 0.7rem;
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: 70px minmax(0, auto);
  grid-gap: 1rem;
`;


export default function MenuTabColors() {
  const colorParams = useColorParams((state) => state.colorParams);
  const setColorParams = useColorParams((state) => state.setColorParams);

  return (
    <>
      <H4>Color Default</H4>
      <BackgroundColorDiv>
        <div>Choose</div>
        <ColorPicker
          color={colorParams.chooseColor}
          onChange={(color) => {
            setColorParams({
              chooseColor: color,
            });
          }}
        />
      </BackgroundColorDiv>
      <BackgroundColorDiv>
        <div>Review</div>
        <ColorPicker
          color={colorParams.reviewColor}
          onChange={(color) => {
            setColorParams({
              reviewColor: color,
            });
          }}
        />
      </BackgroundColorDiv>
      <BackgroundColorDiv>
        <div>Wireframe</div>
        <ColorPicker
          color={colorParams.wireframeColor}
          onChange={(color) => {
            setColorParams({
              wireframeColor: color,
            });
          }}
        />
      </BackgroundColorDiv>
      {/* <H4 style={{ marginBottom: 0 }}>Color Custom</H4>
      <BackgroundColorDiv>
        <div>Choose</div>
        <ColorPicker
          color={defaultParams.canvasBackgroundColor}
          onChange={(color) => {
            setDefaultParams({
              canvasBackgroundColor: color,
            });
          }}
        />
      </BackgroundColorDiv> */}
      {/* <BackgroundColorDiv>
        <div>Choose</div>
        <ColorPicker
          color={defaultParams.canvasBackgroundColor}
          onChange={(color) => {
            setDefaultParams({
              canvasBackgroundColor: color,
            });
          }}
        />
      </BackgroundColorDiv> */}
      {/* <TextP style={{ marginBottom: '0.6rem' }}> Switch to {colorScheme === 'light' ? 'dark' : 'light'} mode theme.</TextP>
      <Button
        size="xs"
        variant="default"
        onClick={() => {
          toggleColorScheme();
        }}
        rightIcon={colorScheme === 'light' ? <FaMoon /> : <FaSun />}
      >
        Switch
      </Button>
      <H4 style={{ marginTop: '1.5rem' }}>Color Picker</H4>
      <TextP style={{ marginBottom: '0.6rem' }}> Choose the default color picker style.</TextP>
      <NativeSelect
        sx={{ marginBottom: '1rem' }}
        key={`color-picker-select-${defaultParams.activeColorPicker}`}
        size="xs"
        data={COLOR_PICKERS.map((colorPicker) => ({
          value: colorPicker,
          label: colorPicker?.replace('Picker', '')?.replace('Github', 'GitHub'),
        }))}
        value={defaultParams.activeColorPicker}
        onChange={(event) => {
          setDefaultParams({
            activeColorPicker: event.target.value as ColorPickerType,
          });
        }}
      />
      <ColorPickerElement type={defaultParams.activeColorPicker} /> */}
    </>
  );
}
