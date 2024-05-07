import type { MapColorBoxType } from '~/config/types';

const colors: MapColorBoxType =
{
  "hotpink": {
    "color": "hotpink",
    "wireframe": "yellow",
    "choose": "red",
    "review": "rgb(51, 51, 204)",
    "label": "HotPink"
  },
  "black": {
    "color": "black",
    "wireframe": "yellow",
    "choose": "red",
    "review": "rgb(51, 51, 204)",
    "label": "BLack"
  },
  "grey": {
    "color": "rgb(180, 150, 102)",
    "wireframe": "yellow",
    "choose": "red",
    "review": "rgb(51, 51, 204)",
    "label": "Grey"
  },
  "white": {
    "color": "rgb(255,255,255)",
    "wireframe": "yellow",
    "choose": "red",
    "review": "rgb(51, 51, 204)",
    "label": "White"
  }
}

export default function getAvailableColor(): MapColorBoxType {
  return colors;
}
