import { create } from 'zustand';

type ActiveBoxLayerId = string | null;

const useActiveBoxLayerId = create<{
  activeBoxLayerId: ActiveBoxLayerId;
  setActiveBoxLayerId: (activeBoxLayerId: ActiveBoxLayerId) => void;
}>((set) => ({
  activeBoxLayerId: null,
  setActiveBoxLayerId: (activeBoxLayerId: ActiveBoxLayerId) => set(() => ({ activeBoxLayerId })),
}));

export default useActiveBoxLayerId;
