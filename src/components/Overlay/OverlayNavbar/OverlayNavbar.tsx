import styled from '@emotion/styled';
import { ActionIcon, Tooltip } from '@mantine/core';
import React, { type ReactNode } from 'react';
import { AiOutlineBgColors } from 'react-icons/ai';
import { BsCCircle, BsImageFill, BsLayers } from 'react-icons/bs';
import { FaDashcube, FaMousePointer, FaPaintBrush, FaRegObjectGroup } from 'react-icons/fa';
// import { BsSquare, BsCircle, BsImageFill } from 'react-icons/bs';
// import { HiPencil } from 'react-icons/hi';
// import { RiImageLine } from 'react-icons/ri';
// import { RxText } from 'react-icons/rx';

import type { UserMode } from '~/config/types';
import useCollectionApi from '~/hooks/useCollectionApi';
import useActiveObjectId from '~/store/useActiveObjectId';
import useUserMode from '~/store/useUserMode';
import theme from '~/theme';

const Nav = styled('div')`
  display: flex;
  align-items: center;
  gap: ${theme.variables.overlayItemsGutter};
`;

const Div = styled('div')`
  pointer-events: auto;
  background: var(--color-bgPrimary);
  border-radius: 0.25rem;
  padding: 0.3rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  border: 0.0625rem solid var(--color-borderPrimary);
`;

const Ul = styled('ul')`
  width: 100%;
  height: 100%;
  list-style: none;
  padding: 0;
  display: grid;
  grid-gap: 0.15rem;
  align-items: center;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  & > li {
    width: 100%;
    height: 100%;
  }
`;

interface UserModeButton {
  mode: UserMode;
  label: string;
  icon: ReactNode;
}

const userModeButtonsPrimary: UserModeButton[] = [
  {
    mode: 'select',
    label: 'Select mode',
    icon: <FaMousePointer />,
  },
];

const userModeButtonsSecondary: UserModeButton[] = [
  // {
  //   mode: 'free-draw',
  //   label: 'Draw',
  //   icon: <HiPencil />,
  // },
  // {
  //   mode: 'rectangle',
  //   label: 'Rectangle',
  //   icon: <BsSquare />,
  // },
  // {
  //   mode: 'ellipse',
  //   label: 'Ellipse',
  //   icon: <BsCircle />,
  // },
  // {
  //   mode: 'text',
  //   label: 'Text',
  //   icon: <RxText />,
  // },
  // {
  //   mode: 'icon',
  //   label: 'Icon',
  //   icon: <RiImageLine />,
  // },
  // {
  //   mode: 'image',
  //   label: 'Image',
  //   icon: <BsImageFill />,
  // },
  {
    mode: 'boxLayer',
    label: 'BoxLayer',
    icon: <BsLayers />,
  },
  {
    mode: 'boxGroup',
    label: 'BoxGroup',
    icon: <FaRegObjectGroup />,
  },
  {
    mode: 'boxCube',
    label: 'BoxCube',
    icon: <FaDashcube />,
  },
  {
    mode: 'colors',
    label: 'Colors',
    icon: <AiOutlineBgColors />,
  },
];

export default function OverlayNavbar() {
  const setActiveObjectId = useActiveObjectId((state) => state.setActiveObjectId);

  const userMode = useUserMode((state) => state.userMode);
  const setUserMode = useUserMode((state) => state.setUserMode);

  const renderUserModeButtons = (buttons: UserModeButton[]) => (
    <Div>
      <Ul style={{ gridTemplateColumns: `repeat(${buttons.length}, minmax(0, 1fr))` }}>
        {buttons.map(({ mode, label, icon }) => {
          const isActive = userMode === mode;
          return (
            <li key={mode}>
              <Tooltip
                position="bottom-start"
                label={`${label}${label.endsWith('mode') ? '' : ' tool'}${isActive ? ` (active)` : ''}`}
                offset={16}
              >
                <ActionIcon
                  color="dark"
                  variant={isActive ? 'gradient' : 'dark'}
                  size="lg"
                  onClick={() => {
                    setUserMode(mode);
                    setActiveObjectId(null);
                  }}
                >
                  {icon}
                </ActionIcon>
              </Tooltip>
            </li>
          );
        })}
      </Ul>
    </Div>
  );

  return (
    <Nav>
      {renderUserModeButtons(userModeButtonsPrimary)}
      {renderUserModeButtons(userModeButtonsSecondary)}
    </Nav>
  );
}
