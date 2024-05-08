import { create } from 'zustand';

const DEFAULT_ZOOM = 40;

const MIN_ZOOM = 5;
const MAX_ZOOM = 300;

const DEFAULT_POSY = -8;

const MIN_POSY = -100;
const MAX_POSY = 100;

const useZoom = create<{
  zoom: number;
  posY: number;
  resetZoom: () => void;
  setZoom: (zoom: number) => void;
  decrementZoom: (zoom: number) => void;
  incrementZoom: (zoom: number) => void;
  setPosY: (zoom: number) => void;
  incrementPosY: (zoom: number) => void;
  decrementPosY: (zoom: number) => void;
}>((set) => ({
  zoom: DEFAULT_ZOOM,
  posY: DEFAULT_POSY,
  resetZoom: () => set(() => ({ zoom: DEFAULT_ZOOM })),
  setZoom: (zoom: number) => set((state) => ({ ...state, zoom })),
  decrementZoom: (zoom: number) =>
    set((state) => {
      const newZoom = state.zoom - zoom;
      if (newZoom < MIN_ZOOM) {
        return { ...state, zoom: MIN_ZOOM };
      }
      return { ...state, zoom: newZoom };
    }),
  incrementZoom: (zoom: number) =>
    set((state) => {
      const newZoom = state.zoom + zoom;
      if (newZoom > MAX_ZOOM) {
        return { ...state, zoom: MAX_ZOOM };
      }
      return { ...state, zoom: newZoom };
    }),
  setPosY: (posY: number) => set((state) => ({ ...state, posY })),
  decrementPosY: (posY: number) =>
    set((state) => {
      const newZoom = state.posY - posY;
      if (newZoom < MIN_POSY) {
        return { ...state, posY: MIN_POSY };
      }
      return { ...state, posY: newZoom };
    }),
  incrementPosY: (posY: number) =>
    set((state) => {
      const newZoom = state.posY + posY
      if (newZoom > MAX_POSY) {
        return { ...state, posY: MAX_POSY };
      }
      return { ...state, posY: newZoom };
    }),
}));

export default useZoom;
