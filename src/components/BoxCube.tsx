import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { type ReactNode, type CSSProperties, useEffect, useState } from "react";

import useAvailableColors from "~/store/useAvailableColors";
import useActiveBoxCubeId from "~/store/useBoxCubeId";
import useActiveBoxGroupId from "~/store/useBoxGroupId";
import useUserMode from "~/store/useUserMode";

interface BoxProps {
  children?: ReactNode;
  position: number[];
  color: string;
  choose?: boolean;
  style?: CSSProperties;
}

function BoxOne({ color, choose, position }: BoxProps) {
  const x = position[0] || 0;
  const y = position[1] || 0;
  const z = position[2] || 0;
  const availableColors = useAvailableColors((state) => state.availableColors);
  const colorBox = availableColors[color];
  const wireframe = choose ? colorBox.choose : colorBox.wireframe;

  return (
    <group>
      <mesh position={[x, y, z + 2 / 3]} scale={[1 / 3, 1 / 3, 1 / 3]}>
        <boxGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color={wireframe} wireframe />
      </mesh>
      <mesh position={[x, y, z]}>
        <boxGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color={wireframe} wireframe />
      </mesh>
      <mesh position={[x, y, z + 2 / 3]} scale={[1 / 3, 1 / 3, 1 / 3]}>
        <boxGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color={colorBox.color} />
      </mesh>
      <mesh position={[x, y, z]}>
        <boxGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color={colorBox.color} />
      </mesh>
    </group>
  )
}


function BoxTwo({ color, choose, position }: BoxProps) {
  const x = position[0] || 0;
  const y = position[1] || 0;
  const z = position[2] || 0;
  const availableColors = useAvailableColors((state) => state.availableColors);
  const colorBox = availableColors[color];
  const wireframe = choose ? colorBox.choose : colorBox.wireframe;

  return (
    <group>
      <mesh position={[x + 0.5, y, z]} scale={[2, 1, 1]}>
        <boxGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color={wireframe} wireframe />
      </mesh>
      <mesh position={[x, y, z + 2 / 3]} scale={[1 / 3, 1 / 3, 1 / 3]}>
        <boxGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color={wireframe} wireframe />
      </mesh>
      <mesh position={[x, y, z + 2 / 3]} scale={[1 / 3, 1 / 3, 1 / 3]}>
        <boxGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color={colorBox.color} />
      </mesh>
      <mesh position={[x, y, z]}>
        <boxGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color={colorBox.color} />
      </mesh>
      <mesh position={[x + 1, y, z + 2 / 3]} scale={[1 / 3, 1 / 3, 1 / 3]}>
        <boxGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color={wireframe} wireframe />
      </mesh>
      <mesh position={[x + 1, y, z + 2 / 3]} scale={[1 / 3, 1 / 3, 1 / 3]}>
        <boxGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color={colorBox.color} />
      </mesh>
      <mesh position={[x + 1, y, z]}>
        <boxGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color={colorBox.color} />
      </mesh>
    </group>
  )
}

function BoxTwoDoc({ color, choose, position }: BoxProps) {
  const x = position[0] || 0;
  const y = position[1] || 0;
  const z = position[2] || 0;
  const availableColors = useAvailableColors((state) => state.availableColors);
  const colorBox = availableColors[color];
  const wireframe = choose ? colorBox.choose : colorBox.wireframe;

  return (
    <group>
      <mesh position={[x, y + 0.5, z]} scale={[1, 2, 1]}>
        <boxGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color={wireframe} wireframe />
      </mesh>
      <mesh position={[x, y, z + 2 / 3]} scale={[1 / 3, 1 / 3, 1 / 3]}>
        <boxGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color={wireframe} wireframe />
      </mesh>
      <mesh position={[x, y, z + 2 / 3]} scale={[1 / 3, 1 / 3, 1 / 3]}>
        <boxGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color={colorBox.color} />
      </mesh>
      <mesh position={[x, y, z]}>
        <boxGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color={colorBox.color} />
      </mesh>
      <mesh position={[x, y + 1, z + 2 / 3]} scale={[1 / 3, 1 / 3, 1 / 3]}>
        <boxGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color={wireframe} wireframe />
      </mesh>
      <mesh position={[x, y + 1, z + 2 / 3]} scale={[1 / 3, 1 / 3, 1 / 3]}>
        <boxGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color={colorBox.color} />
      </mesh>
      <mesh position={[x, y + 1, z]}>
        <boxGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color={colorBox.color} />
      </mesh>
    </group>
  )
}


function BoxThree({ color, choose, position }: BoxProps) {
  const x = position[0] || 0;
  const y = position[1] || 0;
  const z = position[2] || 0;
  const availableColors = useAvailableColors((state) => state.availableColors);
  const colorBox = availableColors[color];
  const wireframe = choose ? colorBox.choose : colorBox.wireframe;

  return (
    <group>
      <mesh position={[x + 1, y, z]} scale={[3, 1, 1]}>
        <boxGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color={wireframe} wireframe />
      </mesh>
      <mesh position={[x, y, z + 2 / 3]} scale={[1 / 3, 1 / 3, 1 / 3]}>
        <boxGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color={wireframe} wireframe />
      </mesh>
      <mesh position={[x, y, z + 2 / 3]} scale={[1 / 3, 1 / 3, 1 / 3]}>
        <boxGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color={colorBox.color} />
      </mesh>
      <mesh position={[x, y, z]} rotateX={90}>
        <boxGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color={colorBox.color} />
      </mesh>
      <mesh position={[x + 1, y, z + 2 / 3]} scale={[1 / 3, 1 / 3, 1 / 3]}>
        <boxGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color={wireframe} wireframe />
      </mesh>
      <mesh position={[x + 1, y, z + 2 / 3]} scale={[1 / 3, 1 / 3, 1 / 3]}>
        <boxGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color={colorBox.color} />
      </mesh>
      <mesh position={[x + 1, y, z]}>
        <boxGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color={colorBox.color} />
      </mesh>
      <mesh position={[x + 2, y, z + 2 / 3]} scale={[1 / 3, 1 / 3, 1 / 3]}>
        <boxGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color={wireframe} wireframe />
      </mesh>
      <mesh position={[x + 2, y, z + 2 / 3]} scale={[1 / 3, 1 / 3, 1 / 3]}>
        <boxGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color={colorBox.color} />
      </mesh>
      <mesh position={[x + 2, y, z]}  >
        <boxGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color={colorBox.color} />
      </mesh>
    </group>
  )
}



function BoxThreeDoc({ color, choose, position }: BoxProps) {
  const x = position[0] || 0;
  const y = position[1] || 0;
  const z = position[2] || 0;
  const availableColors = useAvailableColors((state) => state.availableColors);
  const colorBox = availableColors[color];
  const wireframe = choose ? colorBox.choose : colorBox.wireframe;

  return (
    <group>
      <mesh position={[x, y + 1, z]} scale={[1, 3, 1]}>
        <boxGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color={wireframe} wireframe />
      </mesh>
      <mesh position={[x, y, z + 2 / 3]} scale={[1 / 3, 1 / 3, 1 / 3]}>
        <boxGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color={wireframe} wireframe />
      </mesh>
      <mesh position={[x, y, z + 2 / 3]} scale={[1 / 3, 1 / 3, 1 / 3]}>
        <boxGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color={colorBox.color} />
      </mesh>
      <mesh position={[x, y, z]}>
        <boxGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color={colorBox.color} />
      </mesh>
      <mesh position={[x, y + 1, z + 2 / 3]} scale={[1 / 3, 1 / 3, 1 / 3]}>
        <boxGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color={wireframe} wireframe />
      </mesh>
      <mesh position={[x, y + 1, z + 2 / 3]} scale={[1 / 3, 1 / 3, 1 / 3]}>
        <boxGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color={colorBox.color} />
      </mesh>
      <mesh position={[x, y + 1, z]}>
        <boxGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color={colorBox.color} />
      </mesh>
      <mesh position={[x, y + 2, z + 2 / 3]} scale={[1 / 3, 1 / 3, 1 / 3]}>
        <boxGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color={wireframe} wireframe />
      </mesh>
      <mesh position={[x, y + 2, z + 2 / 3]} scale={[1 / 3, 1 / 3, 1 / 3]}>
        <boxGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color={colorBox.color} />
      </mesh>
      <mesh position={[x, y + 2, z]}  >
        <boxGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color={colorBox.color} />
      </mesh>
    </group>
  )
}

interface BoxDrawProps {
  id?: string;
  position: number[];
  show?: boolean;
  count: number;
  choose?: boolean;
  color: string;
  doc: number;
}

interface BoxGroupProps {
  id?: string;
  boxGroup: any[];
  position: number[];
  show?: boolean;
}


interface BoxCubeProps {
  id?: string;
  boxGroup: any[];
  position: number[];
  show?: boolean;
}


export const BoxDraw = ({ id, position, show, choose, count, color, doc }: BoxDrawProps) => {
  const userMode = useUserMode((state) => state.userMode);
  const activeBoxCubeId = useActiveBoxCubeId((state) => state.activeBoxCubeId);
  const chooseNew = (choose || (userMode == 'boxCube' && id == activeBoxCubeId)) ? true : false;
  if (show === false) {
    return (<></>)
  }
  switch (count) {
    case 1:
      return BoxOne({ color, choose: chooseNew, position });
    case 2:
      if (doc) {
        return BoxTwoDoc({ color, choose: chooseNew, position });
      }
      return BoxTwo({ color, choose: chooseNew, position });
    case 3:
      if (doc) {
        return BoxThreeDoc({ color, choose: chooseNew, position });
      }
      return BoxThree({ color, choose: chooseNew, position });
  }
  return (<></>)
}

const BoxGroup = ({ id, position, boxGroup, show }: BoxGroupProps) => {

  const userMode = useUserMode((state) => state.userMode);
  const activeBoxGroupId = useActiveBoxGroupId((state) => state.activeBoxGroupId);
  const choose = (userMode == 'boxGroup' && id == activeBoxGroupId) ? true : false;

  if (show === false || !boxGroup) {
    return (<></>)
  }

  return (
    <group>
      {boxGroup?.map((box, idx) => {

        let positionNew = [0, 0, 0];
        if (box.position) {
          positionNew = [...box.position];
        }
        positionNew[0] = positionNew[0] + position[0]
        positionNew[1] = positionNew[1] + position[1]
        positionNew[2] = positionNew[2] + position[2]
        return <BoxDraw {...box} choose={choose} position={positionNew} key={box.id || idx} />
      })}
    </group>
  )
}

function BoxCube({ position, boxGroup, show }: BoxCubeProps) {
  if (show === false || !boxGroup) {
    return (<></>)
  }

  return (
    <group>
      {boxGroup.map((box, idx) => {

        let positionNew = [0, 0, 0];
        if (box.position) {
          positionNew = [...box.position];
        }
        positionNew[0] = positionNew[0] + position[0]
        positionNew[1] = positionNew[1] + position[1]
        positionNew[2] = positionNew[2] + position[2]
        return <BoxGroup {...box} position={positionNew} key={box.id || idx} />
      })}
    </group>
  )
}
export default BoxCube;

