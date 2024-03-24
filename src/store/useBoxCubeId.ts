import { create } from 'zustand';

type ActiveBoxCubeId = string | null;

const useActiveBoxCubeId = create<{
  activeBoxCubeId: ActiveBoxCubeId;
  setActiveBoxCubeId: (activeBoxCubeId: ActiveBoxCubeId) => void;
}>((set) => ({
  activeBoxCubeId: null,
  setActiveBoxCubeId: (activeBoxCubeId: ActiveBoxCubeId) => set(() => ({ activeBoxCubeId })),
}));

export default useActiveBoxCubeId;
