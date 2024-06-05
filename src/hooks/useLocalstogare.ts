import type { ColorScheme } from '@mantine/core';
import { parseCookies, setCookie } from 'nookies';

import { CookieTypes } from '~/config/cookieTypes';
import { DEFAULT_COLOR_SCHEME } from '~/config/settings';
import generateUniqueId from '~/utils/generateUniqueId';

const randomDeviceHash = generateUniqueId();

const useLocalstogare = (): {
  getBoxLayerObject: () => any;
  setBoxLayerObject: (collectionId: number, data: string) => any;
} => ({
  getBoxLayerObject: (): any => {
    const store = localStorage.getItem(CookieTypes.BoxLayerObject)
    if (!store) {
      return [];
    }
    return JSON.parse(store);
  },
  setBoxLayerObject: (collectionId: number, data: string): any => {
    try {
      for (let i = 0; i < 3; i++) {
        const store = localStorage.getItem(collectionId + "_" + CookieTypes.BoxLayerObject + "_" + i)
        if (store) {
          localStorage.setItem(collectionId + "_" + CookieTypes.BoxLayerObject + "_" + (i + 1), store)
        }
      }
    } catch (ex) {

    }
    localStorage.setItem(collectionId + "_" + CookieTypes.BoxLayerObject + "_" + 0, data)
  },

});

export default useLocalstogare;
