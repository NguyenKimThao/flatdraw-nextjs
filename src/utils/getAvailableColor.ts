import type { MapColorBoxType } from '~/config/types';

const colors: MapColorBoxType =
{
  "hotpink": {
    "color": "hotpink",
    "wireframe": "rgb(236,244,98)",
    "choose": "red",
    "review": "rgb(51, 51, 204)",
    "label": "HotPink"
  },
  "black": {
    "color": "rgb(115, 39, 30)",
    "wireframe": "rgb(236,244,98)",
    "choose": "red",
    "review": "rgb(51, 51, 204)",
    "label": "BLack"
  },
  "grey": {
    "color": "rgb(119,115,104)",
    "wireframe": "rgb(236,244,98)",
    "choose": "red",
    "review": "rgb(51, 51, 204)",
    "label": "Grey"
  },
  "dark": {
    "color": "rgb(115, 39, 30)",
    "wireframe": "rgb(236,244,98)",
    "choose": "red",
    "review": "rgb(51, 51, 204)",
    "label": "Dark"
  },
  "white": {
    "color": "rgb(255,255,255)",
    "wireframe": "rgb(236,244,98)",
    "choose": "red",
    "review": "rgb(51, 51, 204)",
    "label": "White"
  }
}

export default function getAvailableColor(): MapColorBoxType {
  return colors;
}
