import type { MapColorBoxType } from '~/config/types';

const colors: MapColorBoxType =
{
  "hotpink": {
    "color": "hotpink",
    "wireframe": "yellow",
    "label": "HotPink"
  },
  "black": {
    "color": "black",
    "wireframe": "yellow",
    "label": "BLack"
  },
  "white": {
    "color": "white",
    "wireframe": "yellow",
    "label": "White"
  }
}

export default function getAvailableColor(): MapColorBoxType {
  return colors;
}
