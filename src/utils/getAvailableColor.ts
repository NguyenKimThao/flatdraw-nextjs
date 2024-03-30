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
    "color": "rgb(104,106,97)",
    "wireframe": "yellow",
    "choose": "red",
    "label": "Grey"
  },
  "white": {
    "color": "rgb(255,255,255)",
    "wireframe": "yellow",
    "choose": "red",
    "label": "White"
  }
}

export default function getAvailableColor(): MapColorBoxType {
  return colors;
}
