import { create } from 'zustand';

import type { ColorBoxType, MapColorBoxType } from '~/config/types';
import ApiService from '~/service';

const colors: MapColorBoxType =
{
  "hotpink": {
    "color": "hotpink",
    "wireframe": "yellow",
    "choose": "red",
    "review": "rgb(51, 51, 204)",
    "label": "HotPink"
  },
  "black": {
    "color": "black",
    "wireframe": "yellow",
    "choose": "red",
    "review": "rgb(51, 51, 204)",
    "label": "BLack"
  },
  "grey": {
    "color": "rgb(153, 153, 102)",
    "wireframe": "yellow",
    "choose": "red",
    "review": "rgb(51, 51, 204)",
    "label": "Grey"
  },
  "white": {
    "color": "rgb(255,255,255)",
    "wireframe": "yellow",
    "choose": "red",
    "review": "rgb(51, 51, 204)",
    "label": "White"
  }
}

const useColorApi = create<{
  colors: MapColorBoxType,
  loading: () => void;
  createColor: (colorBox: ColorBoxType) => void;
  deleteColor: (color: string) => void;
}>((set, get) => ({
  colors: colors,
  loading: async () => {
    const data = await ApiService.getColors();
    if (data == null || data.error != 0 || !data.data) {
      set({
        colors: colors,
      });
    } else {
      set({
        colors: data.data
      });
    }
  },
  createColor: async (colorBox: ColorBoxType) => {
    const colors_current = get().colors;
    colors_current[colorBox.color] = colorBox;
    const data = await ApiService.updateColor(colors_current);
    if (data == null || data.error != 0 || !data.data) {
      set((state) => ({
        ...state,
      }));
    } else {
      set((state) => ({
        ...state,
        colors: { ...colors_current }
      }));
    }
  },
  deleteColor: async (color: string) => {
    const colors_current = get().colors;
    delete colors_current[color];
    const data = await ApiService.updateColor(colors_current);
    if (data == null || data.error != 0 || !data.data) {
      set((state) => ({
        ...state,
      }));
    } else {
      set((state) => ({
        ...state,
        colors: { ...colors_current }
      }));
    }
  }
}));

export default useColorApi;
