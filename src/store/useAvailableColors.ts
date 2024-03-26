import { create } from 'zustand';
import type { MapColorBoxType } from '~/config/types';

const useAvailableColors = create<{
  availableColors: MapColorBoxType;
  setAvailableColors: (availableColors: MapColorBoxType) => void;
}>((set) => ({
  availableColors: {},
  setAvailableColors: (availableColors: MapColorBoxType) => set(() => ({ availableColors })),
}));

export default useAvailableColors;
