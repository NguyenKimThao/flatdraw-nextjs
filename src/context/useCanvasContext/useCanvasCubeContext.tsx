
import { OrbitControls, OrbitControlsProps } from "@react-three/drei";
import { ForwardRefComponent } from "@react-three/drei/helpers/ts-utils";
import React, {
  useContext,
  useRef,
  useMemo,
  createContext,
  createRef,
  type ReactNode,
  type MutableRefObject,
} from 'react';


interface CanvasCubeContextType {
  canvasCubeRef: MutableRefObject<HTMLCanvasElement | null>;
  orbitControlRef: MutableRefObject<any | null>;
}

const initialState: CanvasCubeContextType = {
  canvasCubeRef: createRef(),
  orbitControlRef: createRef(),
};

const CanvasCubeContext = createContext<CanvasCubeContextType>(initialState);

export function CanvasCubeContextProvider({ children }: { children: ReactNode }) {
  const canvasCubeRef = useRef<HTMLCanvasElement | null>(null);
  const orbitControlRef = useRef<any | null>(null);

  const value = useMemo(
    () => ({
      canvasCubeRef,
      orbitControlRef,
    }),
    []
  );

  return <CanvasCubeContext.Provider value={value}>{children}</CanvasCubeContext.Provider>;
}

export default function useCanvasCubeContext() {
  return useContext(CanvasCubeContext);
}
