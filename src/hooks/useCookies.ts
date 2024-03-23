import type { ColorScheme } from '@mantine/core';
import { parseCookies, setCookie } from 'nookies';

import { CookieTypes } from '~/config/cookieTypes';
import { DEFAULT_COLOR_SCHEME } from '~/config/settings';
import generateUniqueId from '~/utils/generateUniqueId';

const randomDeviceHash = generateUniqueId();

const useCookies = (): {
  getUserAcceptsCookies: () => boolean;
  setUserAcceptsCookies: () => void;
  getDeviceHash: () => string;
  setDeviceHash: () => void;
  getSavedColoScheme: () => ColorScheme;
  getBoxLayerObject: () => any;
  setBoxLayerObject: (data: any) => unknown;
  setSavedColoScheme: (colorScheme: ColorScheme) => void;
} => ({
  getUserAcceptsCookies: (): boolean => parseCookies()[CookieTypes.UserAcceptsCookies] === 'true',
  setUserAcceptsCookies: (): unknown => setCookie(null, CookieTypes.UserAcceptsCookies, 'true'),
  getDeviceHash: (): string => parseCookies()[CookieTypes.DeviceHash],
  setDeviceHash: (): unknown => setCookie(null, CookieTypes.DeviceHash, randomDeviceHash),
  getBoxLayerObject: (): any => parseCookies()[CookieTypes.BoxLayerObject],
  setBoxLayerObject: (data: any): unknown => setCookie(null, CookieTypes.BoxLayerObject, JSON.stringify(data)),
  getSavedColoScheme: (): ColorScheme => {
    const scheme = parseCookies()[CookieTypes.ColorScheme];
    if (!['light', 'dark'].includes(scheme)) {
      return DEFAULT_COLOR_SCHEME;
    }
    return scheme === 'light' ? 'light' : 'dark';
  },
  setSavedColoScheme: (colorScheme: ColorScheme): unknown => setCookie(null, CookieTypes.ColorScheme, colorScheme),
});

export default useCookies;
