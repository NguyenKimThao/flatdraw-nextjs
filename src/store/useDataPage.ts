import { create } from 'zustand';

const useDataPage = create<{
  firstLoadPage: boolean;
  setFirstLoadPage: () => void;
}>((set) => ({
  firstLoadPage: false,
  setFirstLoadPage: () => set((state) => ({ ...state, firstLoadPage: true })),
}));

export default useDataPage;
