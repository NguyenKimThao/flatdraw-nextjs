import { OrbitControls } from "@react-three/drei";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import React, { type ReactNode, type CSSProperties, useEffect, useState } from "react";

import { MapColorBoxType } from "~/config/types";
import useAvailableColors from "~/store/useAvailableColors";
import useActiveBoxCubeId from "~/store/useBoxCubeId";
import useActiveBoxGroupId from "~/store/useBoxGroupId";
import useUserMode from "~/store/useUserMode";


interface BoxProps {
  id?: string;
  color: string;
  wireframe?: string;
  position: number[];
}

interface MeshBoxProps {
  boxid?: string;
  color: string;
  wireframe?: string;
  position: number[];
  scale?: number[];
}

interface MeshWireFrameProps {
  boxid?: string;
  wireframe?: string;
  position: number[];
  scale?: number[];
}


function MeshBox({ boxid, color, wireframe, position }: MeshBoxProps) {
  return (
    <>
      {wireframe &&
        <mesh position={[position[0], position[1], position[2] + 2 / 3]} scale={[1 / 3, 1 / 3, 1 / 3]}>
          <boxGeometry attach="geometry" />
          <meshBasicMaterial attach="material" color={wireframe} wireframe />
        </mesh>
      }
      <mesh position={[position[0], position[1], position[2] + 2 / 3]} scale={[1 / 3, 1 / 3, 1 / 3]}>
        <boxGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color={color} />
      </mesh>
      <mesh position={position} boxid={boxid}>
        <boxGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color={color} />
      </mesh>
    </>
  )
}

function MeshWireFrame({ boxid, wireframe, position, scale }: MeshWireFrameProps) {
  if (!wireframe) {
    return <></>;
  }
  return (
    <mesh position={position} scale={scale ? scale : [1, 1, 1]} boxid={boxid}>
      <boxGeometry attach="geometry" />
      <meshBasicMaterial attach="material" color={wireframe} wireframe />
    </mesh>
  )
}

function BoxOne({ id, color, wireframe, position }: BoxProps) {
  const x = position[0] || 0;
  const y = position[1] || 0;
  const z = position[2] || 0;

  return (
    <group>
      <MeshWireFrame position={[x, y, z]} wireframe={wireframe} />
      <MeshBox position={[x, y, z]} color={color} wireframe={wireframe} boxid={id} />
    </group>
  )
}


function BoxTwo({ id, color, wireframe, position }: BoxProps) {
  const x = position[0] || 0;
  const y = position[1] || 0;
  const z = position[2] || 0;

  return (
    <group>
      <MeshWireFrame position={[x + 1 / 2, y, z]} scale={[2, 1, 1]} wireframe={wireframe} />
      <MeshBox position={[x, y, z]} color={color} wireframe={wireframe} boxid={id} />
      <MeshBox position={[x + 1, y, z]} color={color} wireframe={wireframe} boxid={id} />
    </group>
  )
}

function BoxTwoDoc({ id, color, wireframe, position }: BoxProps) {
  const x = position[0] || 0;
  const y = position[1] || 0;
  const z = position[2] || 0;

  return (
    <group>
      <MeshWireFrame position={[x, y + 1 / 2, z]} scale={[1, 2, 1]} wireframe={wireframe} />
      <MeshBox position={[x, y, z]} color={color} wireframe={wireframe} boxid={id} />
      <MeshBox position={[x, y + 1, z]} color={color} wireframe={wireframe} boxid={id} />
    </group>
  )
}


function BoxThree({ id, color, wireframe, position }: BoxProps) {
  const x = position[0] || 0;
  const y = position[1] || 0;
  const z = position[2] || 0;

  return (
    <group>
      <MeshWireFrame position={[x + 1, y, z]} scale={[3, 1, 1]} wireframe={wireframe} />
      <MeshBox position={[x, y, z]} color={color} wireframe={wireframe} boxid={id} />
      <MeshBox position={[x + 1, y, z]} color={color} wireframe={wireframe} boxid={id} />
      <MeshBox position={[x + 2, y, z]} color={color} wireframe={wireframe} boxid={id} />
    </group>
  )
}



function BoxThreeDoc({ id, color, wireframe, position }: BoxProps) {
  const x = position[0] || 0;
  const y = position[1] || 0;
  const z = position[2] || 0;

  return (
    <group>
      <MeshWireFrame position={[x, y + 1, z]} scale={[1, 3, 1]} wireframe={wireframe} />
      <MeshBox position={[x, y, z]} color={color} wireframe={wireframe} boxid={id} />
      <MeshBox position={[x, y + 1, z]} color={color} wireframe={wireframe} boxid={id} />
      <MeshBox position={[x, y + 2, z]} color={color} wireframe={wireframe} boxid={id} />
    </group>
  )
}

interface BoxCubeBashProps {
  id?: string;
  color: string;
  wireframe?: string;
  position: number[];
  count: number;
  doc: number;
}

interface BoxDrawProps {
  id?: string;
  position: number[];
  show?: boolean;
  count: number;
  choose?: boolean;
  review?: boolean;
  color: string;
  doc: number;
  onBoxClick?: any;
}

interface BoxGroupProps {
  id?: string;
  boxGroup: any[];
  position: number[];
  show?: boolean;
}


interface BoxCubeProps {
  id?: string;
  boxGroup?: any[];
  position: number[];
  show?: boolean;
}


export const BoxCubeBash = ({ id, color, wireframe, position, count, doc }: BoxCubeBashProps) => {
  switch (count) {
    case 1:
      return BoxOne({ id, color: color, wireframe, position });
    case 2:
      if (doc) {
        return BoxTwoDoc({ id, color: color, wireframe, position });
      }
      return BoxTwo({ id, color: color, wireframe, position });
    case 3:
      if (doc) {
        return BoxThreeDoc({ id, color: color, wireframe, position });
      }
      return BoxThree({ id, color: color, wireframe, position });
  }
  return (<></>)
}

export const BoxDraw = ({ id, position, show, choose, review, count, color, doc, onBoxClick }: BoxDrawProps) => {
  const userMode = useUserMode((state) => state.userMode);
  const activeBoxCubeId = useActiveBoxCubeId((state) => state.activeBoxCubeId);
  const availableColors = useAvailableColors((state) => state.availableColors);

  if (show === false) {
    return (<></>)
  }
  const chooseNew = (choose || (userMode == 'boxCube' && id == activeBoxCubeId)) ? true : false;
  const colorBox = availableColors[color];
  const wireframe = review ? colorBox.review : chooseNew ? colorBox.choose : colorBox.wireframe;

  return (
    <group>
      <BoxCubeBash id={id} wireframe={wireframe} color={colorBox.color} position={position} count={count} doc={doc} />
    </group>
  )
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

