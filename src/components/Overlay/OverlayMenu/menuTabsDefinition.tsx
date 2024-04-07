import type { ReactNode } from 'react';
import { BsImageFill, BsLayersFill } from 'react-icons/bs';
import { FaInfoCircle, FaCloudDownloadAlt, FaUser, FaCog } from 'react-icons/fa';

export type MenuTabId = 'myaccount' | 'canvas' | 'layers' | 'download' | 'settings' | 'about' | 'boxLayers' | 'boxGroups';

export const menuTabsDefinition: {
  id: MenuTabId;
  label: string;
  icon: ReactNode;
}[] = [
    {
      id: 'myaccount',
      label: 'My Account',
      icon: <FaUser />,
    },
    {
      id: 'canvas',
      label: 'Canvas',
      icon: <BsImageFill />,
    },
    {
      id: 'download',
      label: 'Download',
      icon: <FaCloudDownloadAlt />,
    },
    {
      id: 'layers',
      label: 'Layers',
      icon: <BsLayersFill />,
    },
    {
      id: 'boxGroups',
      label: 'Box Groups',
      icon: <BsLayersFill />,
    },
    {
      id: 'boxLayers',
      label: 'Box Layers',
      icon: <BsLayersFill />,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <FaCog />,
    },
    {
      id: 'about',
      label: 'About',
      icon: <FaInfoCircle />,
    },
  ];
