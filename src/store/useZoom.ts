import { create } from 'zustand';

const DEFAULT_ZOOM = 40;

const MIN_ZOOM = 5;
const MAX_ZOOM = 300;

const DEFAULT_POSY = 0;
const DEFAULT_POSX = 0;
const DEFAULT_POSZ = 0;

const MIN_POSY = -200;
const MAX_POSY = 200;

const MIN_POSX = -200;
const MAX_POSX = 200;

const MIN_POSZ = -200;
const MAX_POSZ = 200;

const useZoom = create<{
  zoom: number;
  posX: number;
  posY: number;
  posZ: number;
  resetZoom: () => void;
  setZoom: (zoom: number) => void;
  decrementZoom: (zoom: number) => void;
  incrementZoom: (zoom: number) => void;
  setPosY: (zoom: number) => void;
  incrementPosY: (zoom: number) => void;
  decrementPosY: (zoom: number) => void;
  setPosX: (zoom: number) => void;
  incrementPosX: (zoom: number) => void;
  decrementPosX: (zoom: number) => void;
  setPosZ: (zoom: number) => void;
  incrementPosZ: (zoom: number) => void;
  decrementPosZ: (zoom: number) => void;
}>((set) => ({
  zoom: DEFAULT_ZOOM,
  posY: DEFAULT_POSY,
  posX: DEFAULT_POSX,
  posZ: DEFAULT_POSZ,
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
  setPosX: (posX: number) => set((state) => ({ ...state, posX })),
  decrementPosX: (posX: number) =>
    set((state) => {
      const newZoom = state.posX - posX;
      if (newZoom < MIN_POSX) {
        return { ...state, posX: MIN_POSX };
      }
      return { ...state, posX: newZoom };
    }),
  incrementPosX: (posX: number) =>
    set((state) => {
      const newZoom = state.posX + posX
      if (newZoom > MAX_POSX) {
        return { ...state, posX: MAX_POSX };
      }
      return { ...state, posX: newZoom };
    }),
  setPosZ: (posZ: number) => set((state) => ({ ...state, posZ })),
  decrementPosZ: (posZ: number) =>
    set((state) => {
      const newZoom = state.posZ - posZ;
      if (newZoom < MIN_POSZ) {
        return { ...state, posZ: MIN_POSZ };
      }
      return { ...state, posZ: newZoom };
    }),
  incrementPosZ: (posZ: number) =>
    set((state) => {
      const newZoom = state.posZ + posZ
      if (newZoom > MAX_POSZ) {
        return { ...state, posZ: MAX_POSZ };
      }
      return { ...state, posZ: newZoom };
    }),
}));

export default useZoom;
