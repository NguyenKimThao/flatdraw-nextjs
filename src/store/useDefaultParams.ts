import { create } from 'zustand';

import type { ColorBoxType, MapColorBoxType, ColorPickerType } from '~/config/types';

interface DefaultParams {
  canvasBackgroundColor: string;
  backgroundColorHex: string;
  strokeColorHex: string;
  fontColorHex: string;
  activeColorPicker: ColorPickerType;
  searchQueryIcons: string;
  nameBoxLayer: string;
  positionBoxLayer: number[];
  showBoxLayer: string;
  descriptionBoxLayer: string;
  searchQueryImages: string;
  nameBoxGroup: string;
  positionBoxGroup: number[];
  descriptionBoxGroup: string;
  showBoxGroup: string;
  selectIdCube: string;
  nameBoxCube: string;
  colorBoxCube: string;
  countBoxCube: string;
  docBoxCube: string;
  positionBoxCube: number[];
  descriptionBoxCube: string;
  sizePreset: string | null;
  color: ColorBoxType | null;
}

const useDefaultParams = create<{
  defaultParams: DefaultParams;
  setDefaultParams: (params: Partial<DefaultParams>) => void;
}>((set) => ({
  defaultParams: {
    canvasBackgroundColor: '#FFFFFF',
    backgroundColorHex: '#2A4FB4',
    strokeColorHex: '#1CD71C',
    fontColorHex: '#000000',
    activeColorPicker: 'SketchPicker',
    searchQueryIcons: '',
    nameBoxLayer: '',
    positionBoxLayer: [0, 0, 0],
    showBoxLayer: 'true',
    descriptionBoxLayer: '',
    nameBoxGroup: '',
    positionBoxGroup: [0, 0, 0],
    showBoxGroup: 'true',
    descriptionBoxGroup: '',
    selectIdCube: '',
    nameBoxCube: '',
    colorBoxCube: 'white',
    countBoxCube: '1',
    docBoxCube: '0',
    positionBoxCube: [0, 0, 0],
    descriptionBoxCube: '',
    searchQueryImages: '',
    sizePreset: null,
    color: null,
  },
  setDefaultParams: (params: Partial<DefaultParams>) =>
    set((state) => ({
      defaultParams: { ...state.defaultParams, ...params },
    })),
}));

export default useDefaultParams;
