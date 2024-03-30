import type { ColorScheme } from '@mantine/core';
import { parseCookies, setCookie } from 'nookies';

import { CookieTypes } from '~/config/cookieTypes';
import { DEFAULT_COLOR_SCHEME } from '~/config/settings';
import generateUniqueId from '~/utils/generateUniqueId';

const randomDeviceHash = generateUniqueId();

const useLocalstogare = (): {
  getBoxLayerObject: () => any;
  setBoxLayerObject: (data: string) => any;
} => ({
  getBoxLayerObject: (): any => {
    let store = localStorage.getItem(CookieTypes.BoxLayerObject)
    if (!store) {
      return [];
    }
    return JSON.parse(store);
  },
  setBoxLayerObject: (data: any): any => {
    let store = localStorage.getItem(CookieTypes.BoxLayerObject)
    if (store) {
      localStorage.setItem(CookieTypes.BoxLayerObject + "_" + new Date().getTime(), JSON.stringify(data))
    }
    localStorage.setItem(CookieTypes.BoxLayerObject, JSON.stringify(data))
  },

});

export default useLocalstogare;
