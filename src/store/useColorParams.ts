import { create } from 'zustand';

interface ColorParams {
  chooseColor: string;
  reviewColor: string;
  wireframeColor: string;
}

const useColorParams = create<{
  colorParams: ColorParams;
  setColorParams: (params: Partial<ColorParams>) => void;
}>((set) => ({
  colorParams: {
    wireframeColor: 'yellow',
    chooseColor: 'red',
    reviewColor: 'rgb(51, 51, 204)',
  },
  setColorParams: (params: Partial<ColorParams>) =>
    set((state) => ({
      colorParams: { ...state.colorParams, ...params },
    })),
}));

export default useColorParams;
