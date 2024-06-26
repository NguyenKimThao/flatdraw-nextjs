export type ActionModeType = 'isDrawing' | 'isPanning' | 'isMoving' | 'isResizing' | 'isRotating' | 'isWriting';
export type ActionModeOption =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'middleLeft'
  | 'middleRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight';

export type ActionMode = null | {
  type: ActionModeType;
  boxGroupId: string | null;
  boxCubeObject: any | null;
  option: ActionModeOption | null;
};

type CanvasObjectType =
  | 'rectangle'
  | 'ellipse'
  | 'free-draw'
  | 'line'
  | 'arrow'
  | 'text'
  | 'icon'
  | 'image'
  | 'colors'
  | 'boxCube'
  | 'boxGroup'
  | 'boxLayer';

export type UserMode = 'select' | CanvasObjectType;

export interface CanvasObject {
  // Common
  type: CanvasObjectType;
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  // Type specific
  backgroundColorHex: string;
  strokeColorHex: string;
  strokeWidth: number;
  borderRadius: number;
  freeDrawPoints: { x: number; y: number }[]; // 'free-draw' only
  text: string; // 'text' only
  textJustify: boolean; // 'text' only
  textAlignHorizontal: 'left' | 'center' | 'right'; // 'text' only
  textAlignVertical: 'top' | 'middle' | 'bottom'; // 'text' only
  fontColorHex: string; // 'text' only
  fontSize: number; // 'text' only
  fontFamily: string; // 'text' only
  fontStyle: 'normal' | 'italic' | 'oblique'; // 'text' only
  fontVariant: 'normal' | 'small-caps'; // 'text' only
  fontWeight: 'normal' | 'bold' | 'bolder' | 'lighter' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'; // 'text' only
  fontLineHeightRatio: number; // 'text' only
  svgPath: string; // 'icon' only
  imageUrl: string; // 'image' only
  imageElement: HTMLImageElement | null; // 'image' only
}

type ObjectCommonProperties = Pick<CanvasObject, 'x' | 'y' | 'width' | 'height' | 'opacity'> & { id?: string };

export type RectangleObject = ObjectCommonProperties & {
  type: 'rectangle';
} & Pick<CanvasObject, 'backgroundColorHex' | 'strokeColorHex' | 'strokeWidth' | 'borderRadius'>;

export type EllipseObject = ObjectCommonProperties & {
  type: 'ellipse';
} & Pick<CanvasObject, 'backgroundColorHex' | 'strokeColorHex' | 'strokeWidth' | 'borderRadius'>;

export type FreeDrawObject = ObjectCommonProperties & {
  type: 'free-draw';
} & Pick<CanvasObject, 'strokeColorHex' | 'strokeWidth' | 'freeDrawPoints'>;

export type TextObject = ObjectCommonProperties & {
  type: 'text';
} & Pick<
  CanvasObject,
  | 'text'
  | 'textJustify'
  | 'textAlignHorizontal'
  | 'textAlignVertical'
  | 'fontColorHex'
  | 'fontSize'
  | 'fontFamily'
  | 'fontStyle'
  | 'fontVariant'
  | 'fontWeight'
  | 'fontLineHeightRatio'
>;

export type IconObject = ObjectCommonProperties & {
  type: 'icon';
} & Pick<CanvasObject, 'backgroundColorHex' | 'svgPath'>;

export type ImageObject = ObjectCommonProperties & {
  type: 'image';
} & Pick<CanvasObject, 'imageUrl' | 'imageElement'>;

export interface BoxCubeObject {
  id: string;
  name: string;
  type: CanvasObjectType;
  position: number[];
  boxGroupId: string;
  color: string;
  count: number;
  doc: number;
  description?: string;
}


export interface BoxGroupObject {
  id: string;
  name: string;
  type: CanvasObjectType;
  show?: boolean;
  position: number[];
  boxGroup?: BoxCubeObject[];
  description?: string;
}

export interface BoxLayerObject {
  id: string;
  name: string;
  show?: boolean;
  type: CanvasObjectType;
  position: number[];
  boxGroup?: BoxGroupObject[];
  description?: string;
}

export interface UnsplashImage {
  id: string;
  width: number;
  height: number;
  description: string;
  unsplashUrl: string;
  urls: {
    large: string;
    medium: string;
    small: string;
  };
  author: {
    name: string;
    url: string;
  };
  query: string;
  fetchedAt: string;
}

export interface ScrollPosition {
  x: number;
  y: number;
}

export interface CanvasWorkingSize {
  width: number;
  height: number;
}

export interface ObjectDimensions {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type ColorPickerType =
  | 'AlphaPicker'
  | 'BlockPicker'
  | 'ChromePicker'
  | 'CirclePicker'
  | 'CompactPicker'
  | 'GithubPicker'
  | 'HuePicker'
  | 'MaterialPicker'
  | 'PhotoshopPicker'
  | 'SketchPicker'
  | 'SliderPicker'
  | 'SwatchesPicker'
  | 'TwitterPicker';

export interface ColorBoxType {
  color: string;
  wireframe: string;
  label: string;
  choose: string;
  review: string;
}

export interface MapColorBoxType {
  [key: string]: ColorBoxType;
}

export enum StatusFetch {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  FAIL = "FAIL",
}

export interface SuccessResponse {

}

export interface UserInfoResponse {
  username: string;
  email: string;
  name: string;
}

export interface LoginResponse {
  username: string;
}

export interface CollectionItem {
  id: number;
  name: string;
  info?: string;
  desc?: string;
}

export interface ListCollectionResponse {
  collections?: CollectionItem[];
  length?: number;
}

export interface ListLayerResponse {
  layers?: BoxLayerObject[];
  length?: number;
}

export interface DataResponse<T> {
  error: number;
  message: string;
  data: T | null;
}
