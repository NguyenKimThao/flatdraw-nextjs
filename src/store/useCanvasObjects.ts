import _ from 'lodash';
import { create } from 'zustand';

import type {
  CanvasObject,
  RectangleObject,
  EllipseObject,
  FreeDrawObject,
  TextObject,
  IconObject,
  ImageObject,
  BoxLayerObject,
  BoxGroupObject,
  ActionModeOption,
  CanvasWorkingSize,
  BoxCubeObject,
} from '~/config/types';
import ApiService from '~/service';
import generateUniqueId from '~/utils/generateUniqueId';
import getPositionFromDrawingPoints from '~/utils/getPositionFromDrawingPoints';

function curateObjectModifications(newObject: CanvasObject, existing: CanvasObject) {
  const hasNegativeSize = newObject.width < 1 || newObject.height < 1;
  if (hasNegativeSize) {
    return existing;
  }
  const isTextWithLessThanThreshold = newObject.type === 'text' && newObject.width < newObject.fontSize;
  return isTextWithLessThanThreshold ? existing : newObject;
}

const DEFAULT_CANVAS_OBJECT: Omit<CanvasObject, 'id' | 'type'> = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  backgroundColorHex: '#000000',
  strokeColorHex: '#000000',
  strokeWidth: 1,
  opacity: 100,
  borderRadius: 0,
  freeDrawPoints: [],
  text: '',
  textJustify: false,
  textAlignHorizontal: 'center',
  textAlignVertical: 'middle',
  fontColorHex: '#000000',
  fontSize: 48,
  fontFamily: 'sans-serif',
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 'normal',
  fontLineHeightRatio: 1,
  svgPath: '',
  imageUrl: '',
  imageElement: null,
};

const DEFAULT_BOX_LAYER_OBJECT: Omit<BoxLayerObject, 'id' | 'type'> = {
  name: '',
  position: [0, 0, 0],
  boxGroup: [],
};

const useCanvasObjects = create<{
  canvasObjects: CanvasObject[];
  boxLayerObjects: BoxLayerObject[];
  isSave: boolean;
  setSave: (isSave: boolean) => void;
  loadingBoxLayerObject: (collectionId: number) => void;
  appendRectangleObject: (rectangle: Omit<RectangleObject, 'type'>) => void;
  appendEllipseObject: (ellipse: Omit<EllipseObject, 'type'>) => void;
  appendFreeDrawObject: (freeDraw: Omit<FreeDrawObject, 'type'>) => void;
  appendTextObject: (text: Omit<TextObject, 'type'>) => void;
  appendIconObject: (icon: Omit<IconObject, 'type'>) => void;
  appendBoxLayerObject: (icon: Omit<BoxLayerObject, 'type'>) => void;
  updateBoxLayerObject: (id: string, box: BoxLayerObject) => void;
  appendBoxGroupObject: (id: string, box: BoxGroupObject) => void;
  updateBoxGroupObject: (id: string, box: BoxGroupObject) => void;
  appendBoxCubeObject: (boxLayerId: string, boxGroupId: string, cube: BoxCubeObject) => void;
  updateBoxCubeObject: (boxLayerId: string, boxGroupId: string, cube: BoxCubeObject) => void;
  removeBoxCubeObject: (boxLayerId: string, boxGroupId: string, cubeId: string) => void;
  setBoxLayerObjects: (boxs: BoxLayerObject[]) => void;
  appendImageObject: (icon: Omit<ImageObject, 'type'>) => void;
  updateCanvasObject: (id: string, object: Partial<CanvasObject>) => void;
  appendFreeDrawPointToCanvasObject: (id: string, point: { x: number; y: number }) => void;
  deleteCanvasObject: (id: string) => void;
  toggleShowCanvasBoxLayer: (id: string) => void;
  deleteCanvasBoxLayer: (id: string) => void;
  deleteCanvasBoxGroup: (id: string, boxLayerId: string) => void;
  allShowCanvasBoxLayer: () => void;
  allHiddenCanvasBoxLayer: () => void;
  moveCanvasObject: (params: {
    id: string;
    deltaPosition: { deltaX: number; deltaY: number };
    canvasWorkingSize: CanvasWorkingSize;
  }) => void;
  resizeCanvasObject: (params: {
    id: string;
    actionModeOption: ActionModeOption;
    delta: { deltaX: number; deltaY: number };
    canvasWorkingSize: CanvasWorkingSize;
  }) => void;
  setCanvasObjectLayerIndex: (id: string, layerIndex: number) => void;
  rotateBoxLayer: (id: string) => void;
  rotateBoxGroup: (id: string, groupId: string) => void;
  rotateYBoxLayer: (id: string) => void;
  rotateYBoxGroup: (id: string, groupId: string) => void;
  resetCanvasObjects: () => void;
}>((set) => ({
  canvasObjects: [],
  boxLayerObjects: [],
  isSave: false,
  setSave: (isSave: boolean) => set((state) => ({
    ...state,
    isSave
  })),
  appendRectangleObject: (rectangle) =>
    set((state) => ({
      ...state,
      canvasObjects: [
        ...state.canvasObjects,
        {
          ...DEFAULT_CANVAS_OBJECT,
          type: 'rectangle',
          id: generateUniqueId(),
          ...rectangle,
        },
      ],
    })),
  loadingBoxLayerObject: async (collectionId: number) => {
    const data = await ApiService.getLayers(collectionId);
    if (data == null || data.error != 0 || !data.data) {
      return;
    } else {
      set((state) => ({
        ...state,
        boxLayerObjects: data.data?.layers || []
      }));
    }

  },
  appendEllipseObject: (ellipse) =>
    set((state) => ({
      ...state,
      canvasObjects: [
        ...state.canvasObjects,
        {
          ...DEFAULT_CANVAS_OBJECT,
          type: 'ellipse',
          id: generateUniqueId(),
          ...ellipse,
        },
      ],
    })),
  appendFreeDrawObject: (freeDraw) =>
    set((state) => ({
      ...state,
      canvasObjects: [
        ...state.canvasObjects,
        {
          ...DEFAULT_CANVAS_OBJECT,
          type: 'free-draw',
          id: generateUniqueId(),
          ...freeDraw,
        },
      ],
    })),
  appendTextObject: (text) =>
    set((state) => ({
      ...state,
      canvasObjects: [
        ...state.canvasObjects,
        {
          ...DEFAULT_CANVAS_OBJECT,
          type: 'text',
          id: generateUniqueId(),
          ...text,
        },
      ],
    })),
  appendIconObject: (icon) =>
    set((state) => ({
      ...state,
      canvasObjects: [
        ...state.canvasObjects,
        {
          ...DEFAULT_CANVAS_OBJECT,
          type: 'icon',
          id: generateUniqueId(),
          ...icon,
        },
      ],
    })),
  appendBoxLayerObject: (boxLayer) =>
    set((state) => ({
      ...state,
      boxLayerObjects: [
        ...state.boxLayerObjects,
        {
          ..._.cloneDeep(DEFAULT_BOX_LAYER_OBJECT),
          type: 'boxLayer',
          ...boxLayer,
        },
      ],
    })),
  updateBoxLayerObject: (id, box) => set((state) => {
    const boxLayer = state.boxLayerObjects.find((existing) => existing.id === id);
    if (!boxLayer) {
      return state;
    }
    boxLayer.name = box.name;
    boxLayer.position = box.position;
    return {
      ...state,
      boxLayerObjects: [...state.boxLayerObjects]
    };
  }),
  toggleShowCanvasBoxLayer: (id) => set((state) => {
    const boxLayer = state.boxLayerObjects.find((existing) => existing.id === id);
    if (!boxLayer) {
      return state;
    }
    boxLayer.show = boxLayer.show ? false : true;
    return {
      ...state,
      boxLayerObjects: [...state.boxLayerObjects]
    };
  }),
  appendBoxGroupObject: (id, boxGroup) =>
    set((state) => {
      const boxLayer = state.boxLayerObjects.find((existing) => existing.id === id);
      if (!boxLayer) {
        return state;
      }
      boxLayer.boxGroup?.push(boxGroup);
      return {
        ...state,
      };
    }),
  updateBoxGroupObject: (id, boxGroup) =>
    set((state) => {
      const boxLayer = state.boxLayerObjects.find((existing) => existing.id === id);
      if (!boxLayer || !boxLayer.boxGroup) {
        return state;
      }
      for (let i = 0; i < boxLayer.boxGroup.length; i++) {
        if (boxLayer.boxGroup[i].id == boxGroup.id) {
          boxLayer.boxGroup[i] = boxGroup;
        }
      }
      return {
        ...state,
        boxLayerObjects: [...state.boxLayerObjects]
      };
    }),
  appendBoxCubeObject: (boxLayerId, boxGroupId, cubeLayer) =>
    set((state) => {
      const boxLayer = state.boxLayerObjects.find((existing) => existing.id === boxLayerId);
      if (!boxLayer) {
        return state;
      }
      const boxGroup = boxLayer.boxGroup?.find((boxGroup) => boxGroup.id === boxGroupId);
      if (!boxGroup) {
        return state;
      }

      if (!cubeLayer.name) {
        cubeLayer.name = boxGroup.boxGroup ? (boxGroup.boxGroup?.length + 1) + "" : cubeLayer.id;
      }

      if (!boxGroup.boxGroup) {
        boxGroup.boxGroup = [cubeLayer]
      } else {
        boxGroup?.boxGroup.push(cubeLayer);
      }
      return {
        ...state,
        boxLayerObjects: [...state.boxLayerObjects]
      };
    }),
  updateBoxCubeObject: (boxLayerId, boxGroupId, cubeLayer) =>
    set((state) => {
      const boxLayer = state.boxLayerObjects.find((existing) => existing.id === boxLayerId);
      if (!boxLayer) {
        return state;
      }
      const boxGroup = boxLayer.boxGroup?.find((boxGroup) => boxGroup.id === boxGroupId);
      if (!boxGroup) {
        return state;
      }
      if (!boxGroup.boxGroup) {
        return state;
      }
      if (!cubeLayer.name) {
        cubeLayer.name = cubeLayer.id;
      }
      for (let i = 0; i < boxGroup.boxGroup.length; i++) {
        if (boxGroup.boxGroup[i].id == cubeLayer.id) {
          boxGroup.boxGroup[i] = cubeLayer;
          break;
        }
      }
      return {
        ...state,
        boxLayerObjects: [...state.boxLayerObjects]
      };
    }),
  removeBoxCubeObject: (boxLayerId, boxGroupId, cubeId) =>
    set((state) => {
      const boxLayer = state.boxLayerObjects.find((existing) => existing.id === boxLayerId);
      if (!boxLayer) {
        return state;
      }
      const boxGroup = boxLayer.boxGroup?.find((boxGroup) => boxGroup.id === boxGroupId);
      if (!boxGroup) {
        return state;
      }
      if (!boxGroup.boxGroup) {
        return state;
      }
      boxGroup.boxGroup = boxGroup.boxGroup.filter((cube) => cube.id !== cubeId);
      return {
        ...state,
        boxLayerObjects: [...state.boxLayerObjects]
      };
    }),
  setBoxLayerObjects: (boxs) => set((state) => ({ ...state, boxLayerObjects: [...boxs] })),
  appendImageObject: (icon) =>
    set((state) => ({
      ...state,
      canvasObjects: [
        ...state.canvasObjects,
        {
          ...DEFAULT_CANVAS_OBJECT,
          type: 'image',
          id: generateUniqueId(),
          ...icon,
        },
      ],
    })),
  updateCanvasObject: (id, partialObject) =>
    set((state) => ({
      ...state,
      canvasObjects: state.canvasObjects.map((existing) =>
        existing.id === id ? curateObjectModifications({ ...existing, ...partialObject }, existing) : existing
      ),
    })),
  appendFreeDrawPointToCanvasObject(id, point) {
    set((state) => {
      const { x, y } = getPositionFromDrawingPoints({
        freeDrawPoints: [...(state.canvasObjects.find((o) => o.id === id)?.freeDrawPoints || []), { x: point.x, y: point.y }],
      });

      return {
        ...state,
        canvasObjects: state.canvasObjects.map((existing) =>
          existing.id === id
            ? {
              ...existing,
              x,
              y,
              freeDrawPoints: [...existing.freeDrawPoints, point],
            }
            : existing
        ),
      };
    });
  },
  deleteCanvasObject: (id) =>
    set((state) => ({ ...state, canvasObjects: state.canvasObjects.filter((existing) => existing.id !== id) })),
  deleteCanvasBoxLayer: (id) =>
    set((state) => ({ ...state, boxLayerObjects: state.boxLayerObjects.filter((existing) => existing.id !== id) })),
  deleteCanvasBoxGroup: (id, boxGroup) =>
    set((state) => {
      const boxLayer = state.boxLayerObjects.find((existing) => existing.id === boxGroup);
      if (!boxLayer) {
        return state;
      }
      boxLayer.boxGroup = boxLayer.boxGroup?.filter((boxGroup) => boxGroup.id !== id);
      return {
        ...state,
        boxLayerObjects: [...state.boxLayerObjects]
      };
    }),
  allShowCanvasBoxLayer: () => set((state) => {
    state.boxLayerObjects.forEach((layer) => {
      layer.show = true;
    })

    return {
      ...state,
      boxLayerObjects: [...state.boxLayerObjects]
    };
  }),
  allHiddenCanvasBoxLayer: () => set((state) => {
    state.boxLayerObjects.forEach((layer) => {
      layer.show = false;
    })
    return {
      ...state,
      boxLayerObjects: [...state.boxLayerObjects]
    };
  }),
  moveCanvasObject: ({ id, deltaPosition }) =>
    set((state) => ({
      ...state,
      canvasObjects: state.canvasObjects.map((existing) =>
        existing.id === id
          ? {
            ...existing,
            x: existing.x + deltaPosition.deltaX,
            y: existing.y + deltaPosition.deltaY,
          }
          : existing
      ),
    })),
  resizeCanvasObject: ({ id, actionModeOption, delta }) =>
    set((state) => ({
      ...state,
      canvasObjects: state.canvasObjects.map((existing) => {
        if (existing.id !== id) {
          return existing;
        }
        let result: CanvasObject = existing;
        switch (actionModeOption) {
          case 'topLeft': {
            result = {
              ...existing,
              x: existing.x + delta.deltaX,
              y: existing.y + delta.deltaY,
              width: existing.width - delta.deltaX,
              height: existing.height - delta.deltaY,
              freeDrawPoints: existing.freeDrawPoints.map((point) => {
                const growthRatioX = delta.deltaX / existing.width;
                const growthRatioY = delta.deltaY / existing.height;
                return {
                  x: point.x - (point.x - existing.x) * growthRatioX,
                  y: point.y - (point.y - existing.y) * growthRatioY,
                };
              }),
            };
            break;
          }
          case 'topCenter': {
            result = {
              ...existing,
              y: existing.y + delta.deltaY,
              height: existing.height - delta.deltaY,
              freeDrawPoints: existing.freeDrawPoints.map((point) => {
                const growthRatioY = delta.deltaY / existing.height;
                return {
                  x: point.x,
                  y: point.y - (point.y - existing.y) * growthRatioY,
                };
              }),
            };
            break;
          }
          case 'topRight': {
            result = {
              ...existing,
              width: existing.width + delta.deltaX,
              y: existing.y + delta.deltaY,
              height: existing.height - delta.deltaY,
              freeDrawPoints: existing.freeDrawPoints.map((point) => {
                const growthRatioX = delta.deltaX / existing.width;
                const growthRatioY = delta.deltaY / existing.height;
                return {
                  x: point.x + (point.x - existing.x) * growthRatioX,
                  y: point.y - (point.y - existing.y) * growthRatioY,
                };
              }),
            };
            break;
          }
          case 'middleLeft': {
            result = {
              ...existing,
              x: existing.x + delta.deltaX,
              width: existing.width - delta.deltaX,
              freeDrawPoints: existing.freeDrawPoints.map((point) => {
                const growthRatioX = delta.deltaX / existing.width;
                return {
                  x: point.x - (point.x - existing.x) * growthRatioX,
                  y: point.y,
                };
              }),
            };
            break;
          }
          case 'middleRight': {
            result = {
              ...existing,
              width: existing.width + delta.deltaX,
              freeDrawPoints: existing.freeDrawPoints.map((point) => {
                const growthRatioX = delta.deltaX / existing.width;
                return {
                  x: point.x + (point.x - existing.x) * growthRatioX,
                  y: point.y,
                };
              }),
            };
            break;
          }
          case 'bottomLeft': {
            result = {
              ...existing,
              x: existing.x + delta.deltaX,
              width: existing.width - delta.deltaX,
              height: existing.height + delta.deltaY,
              freeDrawPoints: existing.freeDrawPoints.map((point) => {
                const growthRatioX = delta.deltaX / existing.width;
                const growthRatioY = delta.deltaY / existing.height;
                return {
                  x: point.x - (point.x - existing.x) * growthRatioX,
                  y: point.y + (point.y - existing.y) * growthRatioY,
                };
              }),
            };
            break;
          }
          case 'bottomCenter': {
            result = {
              ...existing,
              height: existing.height + delta.deltaY,
              freeDrawPoints: existing.freeDrawPoints.map((point) => {
                const growthRatioY = delta.deltaY / existing.height;
                return {
                  x: point.x,
                  y: point.y + (point.y - existing.y) * growthRatioY,
                };
              }),
            };
            break;
          }
          case 'bottomRight':
          default: {
            result = {
              ...existing,
              width: existing.width + delta.deltaX,
              height: existing.height + delta.deltaY,
              freeDrawPoints: existing.freeDrawPoints.map((point) => {
                const growthRatioX = delta.deltaX / existing.width;
                const growthRatioY = delta.deltaY / existing.height;
                return {
                  x: point.x + (point.x - existing.x) * growthRatioX,
                  y: point.y + (point.y - existing.y) * growthRatioY,
                };
              }),
            };
            break;
          }
        }
        return curateObjectModifications(result, existing);
      }),
    })),
  setCanvasObjectLayerIndex: (id, layerIndex) =>
    set((state) => {
      if (layerIndex < 0 || layerIndex >= state.canvasObjects.length) {
        return state;
      }
      return {
        ...state,
        canvasObjects: state.canvasObjects.map((existing, index) => {
          if (existing.id === id) {
            return state.canvasObjects[layerIndex];
          }
          if (index === layerIndex) {
            return state.canvasObjects.find((o) => o.id === id)!;
          }
          return existing;
        }),
      };
    }),
  rotateBoxLayer: (boxLayerId: string) => set((state) => {
    const boxLayer = state.boxLayerObjects.find((existing) => existing.id === boxLayerId);
    if (!boxLayer || !boxLayer?.boxGroup) {
      return state;
    }
    const pmin = boxLayer?.boxGroup?.reduce<number | null>(function (prev, curr) {
      if (!curr.boxGroup) {
        return prev;
      }
      const xmin = curr.boxGroup.reduce(function (prev, curr) {
        return prev.position[0] < curr.position[0] ? prev : curr;
      });
      const pmin = xmin.position[0] + curr.position[0]; // 0


      if (prev == null) {
        return pmin;
      }

      return prev < pmin ? prev : pmin;
    }, null);

    const pmax = boxLayer?.boxGroup?.reduce<number | null>(function (prev, curr) {
      if (!curr.boxGroup) {
        return prev;
      }
      const xmax = curr.boxGroup.reduce(function (prev, curr) {
        const mprev = prev.doc == 0 ? prev.position[0] + (prev.count - 1) : prev.position[0];
        const ncurr = curr.doc == 0 ? curr.position[0] + (curr.count - 1) : curr.position[0];

        return mprev > ncurr ? prev : curr;
      });
      const pmax = (xmax.doc == 0 ? xmax.position[0] + (xmax.count - 1) : xmax.position[0]) + curr.position[0]; // 0


      if (prev == null) {
        return pmax;
      }

      return prev > pmax ? prev : pmax;
    }, null);

    if (pmin === null || pmax === null) {
      return state;
    }


    boxLayer?.boxGroup?.forEach(function (boxGroup) {
      if (!boxGroup.boxGroup) {
        return;
      }
      boxGroup.boxGroup.forEach(boxCube => {
        boxCube.position[0] = pmin + pmax - (boxCube.doc == 0 ? boxCube.position[0] + (boxCube.count - 1) : boxCube.position[0]) + boxGroup.position[0];
      });
    });


    return {
      ...state,
      boxLayerObjects: [...state.boxLayerObjects]

    };
  }),
  rotateYBoxLayer: (boxLayerId: string) => set((state) => {
    const boxLayer = state.boxLayerObjects.find((existing) => existing.id === boxLayerId);
    if (!boxLayer || !boxLayer?.boxGroup) {
      return state;
    }
    const pmin = boxLayer?.boxGroup?.reduce<number | null>(function (prev, curr) {
      if (!curr.boxGroup) {
        return prev;
      }
      const xmin = curr.boxGroup.reduce(function (prev, curr) {
        return prev.position[1] < curr.position[1] ? prev : curr;
      });
      const pmin = xmin.position[1] + curr.position[1]; // 0


      if (prev == null) {
        return pmin;
      }

      return prev < pmin ? prev : pmin;
    }, null);

    const pmax = boxLayer?.boxGroup?.reduce<number | null>(function (prev, curr) {
      if (!curr.boxGroup) {
        return prev;
      }
      const xmax = curr.boxGroup.reduce(function (prev, curr) {
        const mprev = prev.doc == 1 ? prev.position[1] + (prev.count - 1) : prev.position[1];
        const ncurr = curr.doc == 1 ? curr.position[1] + (curr.count - 1) : curr.position[1];

        return mprev > ncurr ? prev : curr;
      });
      const pmax = (xmax.doc == 1 ? xmax.position[1] + (xmax.count - 1) : xmax.position[1]) + curr.position[1];


      if (prev == null) {
        return pmax;
      }

      return prev > pmax ? prev : pmax;
    }, null);

    if (pmin === null || pmax === null) {
      return state;
    }


    boxLayer?.boxGroup?.forEach(function (boxGroup) {
      if (!boxGroup.boxGroup) {
        return;
      }
      boxGroup.boxGroup.forEach(boxCube => {
        boxCube.position[1] = pmin + pmax - (boxCube.doc == 1 ? boxCube.position[1] + (boxCube.count - 1) : boxCube.position[1]) + boxGroup.position[1];
      });
    });


    return {
      ...state,
      boxLayerObjects: [...state.boxLayerObjects]

    };
  }),
  rotateBoxGroup: (boxLayerId: string, boxGroupId: string) => set((state) => {
    const boxLayer = state.boxLayerObjects.find((existing) => existing.id === boxLayerId);
    if (!boxLayer) {
      return state;
    }
    const boxGroup = boxLayer.boxGroup?.find((boxGroup) => boxGroup.id === boxGroupId);
    if (!boxGroup) {
      return state;
    }
    if (!boxGroup.boxGroup) {
      return state;
    }

    const xmin = boxGroup.boxGroup.reduce(function (prev, curr) {
      return prev.position[0] < curr.position[0] ? prev : curr;
    });
    const xmax = boxGroup.boxGroup.reduce(function (prev, curr) {
      const mprev = prev.doc == 0 ? prev.position[0] + (prev.count - 1) : prev.position[0];
      const ncurr = curr.doc == 0 ? curr.position[0] + (curr.count - 1) : curr.position[0];

      return mprev > ncurr ? prev : curr;
    });
    const pmin = xmin.position[0]; // 0
    const pmax = (xmax.doc == 0 ? xmax.position[0] + (xmax.count - 1) : xmax.position[0]); // 5

    boxGroup.boxGroup.forEach(boxCube => {
      boxCube.position[0] = pmin + pmax - (boxCube.doc == 0 ? boxCube.position[0] + (boxCube.count - 1) : boxCube.position[0]);
    });

    return {
      ...state,
      boxLayerObjects: [...state.boxLayerObjects]
    };
  }),
  rotateYBoxGroup: (boxLayerId: string, boxGroupId: string) => set((state) => {
    const boxLayer = state.boxLayerObjects.find((existing) => existing.id === boxLayerId);
    if (!boxLayer) {
      return state;
    }
    const boxGroup = boxLayer.boxGroup?.find((boxGroup) => boxGroup.id === boxGroupId);
    if (!boxGroup) {
      return state;
    }
    if (!boxGroup.boxGroup) {
      return state;
    }

    const xmin = boxGroup.boxGroup.reduce(function (prev, curr) {
      return prev.position[1] < curr.position[1] ? prev : curr;
    });
    const xmax = boxGroup.boxGroup.reduce(function (prev, curr) {
      const mprev = prev.doc == 1 ? prev.position[1] + (prev.count - 1) : prev.position[1];
      const ncurr = curr.doc == 1 ? curr.position[1] + (curr.count - 1) : curr.position[1];

      return mprev > ncurr ? prev : curr;
    });
    const pmin = xmin.position[1]; // 0
    const pmax = (xmax.doc == 1 ? xmax.position[0] + (xmax.count - 1) : xmax.position[1]); // 5

    boxGroup.boxGroup.forEach(boxCube => {
      boxCube.position[1] = pmin + pmax - (boxCube.doc == 1 ? boxCube.position[1] + (boxCube.count - 1) : boxCube.position[1]);
    });

    return {
      ...state,
      boxLayerObjects: [...state.boxLayerObjects]
    };
  }),
  resetCanvasObjects: () => set((state) => ({ ...state, canvasObjects: [] })),
}));

export default useCanvasObjects;
