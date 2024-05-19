import type { MapColorBoxType } from '~/config/types';

const colors: MapColorBoxType =
{
  "hotpink": {
    "color": "hotpink",
    "wireframe": "rgb(0,0,0)",
    "choose": "red",
    "review": "rgb(51, 51, 204)",
    "label": "HotPink"
  },
  "black": {
    "color": "rgb(115, 39, 30)",
    "wireframe": "rgb(0,0,0)",
    "choose": "red",
    "review": "rgb(51, 51, 204)",
    "label": "BLack"
  },
  "grey": {
    "color": "rgb(111,115,104)",
    "wireframe": "rgb(0,0,0)",
    "choose": "red",
    "review": "rgb(51, 51, 204)",
    "label": "Grey"
  },
  "dark": {
    "color": "rgb(115, 39, 30)",
    "wireframe": "rgb(0,0,0)",
    "choose": "red",
    "review": "rgb(51, 51, 204)",
    "label": "Dark"
  },
  "yellow": {
    "color": "yellow",
    "wireframe": "rgb(0,0,0)",
    "choose": "red",
    "review": "rgb(51, 51, 204)",
    "label": "Yellow"
  },
  "green": {
    "color": "green",
    "wireframe": "rgb(0,0,0)",
    "choose": "red",
    "review": "rgb(51, 51, 204)",
    "label": "Green"
  },
  "white": {
    "color": "white",
    "wireframe": "rgb(0,0,0)",
    "choose": "red",
    "review": "rgb(51, 51, 204)",
    "label": "White"
  }
}

export default function getAvailableColor(): MapColorBoxType {
  return colors;
}
