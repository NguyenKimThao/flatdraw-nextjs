import type { MapColorBoxType } from '~/config/types';

const colors: MapColorBoxType =
{
  "hotpink": {
    "color": "hotpink",
    "wireframe": "yellow",
    "choose": "red",
    "label": "HotPink"
  },
  "black": {
    "color": "black",
    "wireframe": "yellow",
    "choose": "red",
    "label": "BLack"
  },
  "grey": {
    "color": "grey",
    "wireframe": "yellow",
    "choose": "red",
    "label": "Grey"
  },
  "white": {
    "color": "white",
    "wireframe": "yellow",
    "choose": "red",
    "label": "White"
  }
}

export default function getAvailableColor(): MapColorBoxType {
  return colors;
}
