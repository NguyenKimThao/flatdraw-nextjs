import { create } from 'zustand';

import type { ActionMode, ActionModeType, ActionModeOption } from '~/config/types';

const useActionMode = create<{
  actionMode: ActionMode;
  setActionMode: (params: null | { type: ActionModeType; boxGroupId?: string | null; boxCubeObject?: any | null; option?: ActionModeOption | null }) => void;
}>((set) => ({
  actionMode: null,
  setActionMode: (params) =>
    set(() => ({
      actionMode: params
        ? {
          type: params.type,
          boxGroupId: params.boxGroupId ?? null,
          boxCubeObject: params.boxCubeObject ?? null,
          option: params.option ?? null,
        }
        : null,
    })),
}));

export default useActionMode;
