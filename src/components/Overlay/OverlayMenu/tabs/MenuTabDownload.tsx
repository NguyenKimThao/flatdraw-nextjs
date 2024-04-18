import styled from '@emotion/styled';
import { Button, Checkbox } from '@mantine/core';
import React from 'react';
import { FaDownload } from 'react-icons/fa';

import CanvasPreview from '~/components/CanvasPreview';
import { CANVAS_PREVIEW_UNIQUE_ID } from '~/config/globalElementIds';
import useLocalstogare from '~/hooks/useLocalstogare';
import useCanvasBackgroundColor from '~/store/useCanvasBackgroundColor';
import useCanvasObjects from '~/store/useCanvasObjects';
import useCanvasWorkingSize from '~/store/useCanvasWorkingSize';
import useDefaultParams from '~/store/useDefaultParams';
import generateUniqueId from '~/utils/generateUniqueId';

import { H4 } from '../commonTabComponents';


const DownloadButtonsGridDiv = styled('div')`
  display: inline-grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 0.5rem;
  margin-bottom: 1rem;
`;

export default function MenuTabDownload() {
  const defaultParams = useDefaultParams((state) => state.defaultParams);

  const { setBoxLayerObject } = useLocalstogare();
  const boxLayerObjects = useCanvasObjects((state) => state.boxLayerObjects);

  const canvasWorkingSize = useCanvasWorkingSize((state) => state.canvasWorkingSize);

  const canvasBackgroundColor = useCanvasBackgroundColor((state) => state.canvasBackgroundColor);
  const setCanvasBackgroundColor = useCanvasBackgroundColor((state) => state.setCanvasBackgroundColor);

  const downloadCanvas = (type: 'png' | 'jpg') => {
    const canvas = document.getElementById(CANVAS_PREVIEW_UNIQUE_ID) as HTMLCanvasElement;
    const image = canvas.toDataURL();
    const a = document.createElement('a');
    a.download = `${generateUniqueId()}.${type}`;
    a.href = image;
    a.click();
    a.remove();
  };

  const saveStorage = () => {
    const fileName = "data-layer";
    const json = JSON.stringify(boxLayerObjects, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    // create "a" HTLM element with href to file
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }

  return (
    <>
      {' '}
      <H4>Download</H4>
      <DownloadButtonsGridDiv>
        <Button
          size="xs"
          variant="default"
          onClick={() => {
            downloadCanvas('png');
          }}
          leftIcon={<FaDownload />}
        >
          PNG
        </Button>
        <Button
          size="xs"
          variant="default"
          onClick={() => {
            downloadCanvas('jpg');
          }}
          leftIcon={<FaDownload />}
        >
          JPG
        </Button>
        <Button
          size="xs"
          variant="default"
          onClick={() => {
            saveStorage();
          }}
          leftIcon={<FaDownload />}
        >
          Save Stogare
        </Button>
      </DownloadButtonsGridDiv>
      <H4>
        Preview<span>{`${canvasWorkingSize.width} x ${canvasWorkingSize.height} px`}</span>
      </H4>
      <CanvasPreview />
      <Checkbox
        sx={{ marginTop: '1rem' }}
        size="sm"
        label="Transparent Background"
        checked={canvasBackgroundColor === 'transparent'}
        onChange={(event) => {
          if (event.target.checked) {
            setCanvasBackgroundColor('transparent');
          } else {
            setCanvasBackgroundColor(defaultParams.canvasBackgroundColor);
          }
        }}
      />
    </>
  );
}
