import { create } from 'zustand';

type ActiveBoxGroupId = string | null;

const useActiveBoxGroupId = create<{
  activeBoxGroupId: ActiveBoxGroupId;
  setActiveBoxGroupId: (activeBoxGroupId: ActiveBoxGroupId) => void;
}>((set) => ({
  activeBoxGroupId: null,
  setActiveBoxGroupId: (activeBoxGroupId: ActiveBoxGroupId) => set(() => ({ activeBoxGroupId })),
}));

export default useActiveBoxGroupId;
