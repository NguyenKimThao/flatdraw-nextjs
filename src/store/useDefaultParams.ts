import { create } from 'zustand';

import type { ColorPickerType } from '~/config/types';

interface DefaultParams {
  canvasBackgroundColor: string;
  backgroundColorHex: string;
  strokeColorHex: string;
  fontColorHex: string;
  activeColorPicker: ColorPickerType;
  searchQueryIcons: string;
  nameBoxLayer: string;
  positionBoxLayer: number[];
  searchQueryImages: string;
  nameBoxGroup: string;
  positionBoxGroup: number[];
  selectIdCube: string;
  nameBoxCube: string;
  colorBoxCube: string;
  countBoxCube: string;
  docBoxCube: string;
  positionBoxCube: number[];
  sizePreset: string | null;
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
    nameBoxGroup: '',
    positionBoxGroup: [0, 0, 0],
    selectIdCube: '',
    nameBoxCube: '',
    colorBoxCube: '',
    countBoxCube: '',
    docBoxCube: '',
    positionBoxCube: [0, 0, 0],
    searchQueryImages: '',
    sizePreset: null,
  },
  setDefaultParams: (params: Partial<DefaultParams>) =>
    set((state) => ({
      defaultParams: { ...state.defaultParams, ...params },
    })),
}));

export default useDefaultParams;
