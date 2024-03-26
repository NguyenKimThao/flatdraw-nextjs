import React, { type ReactNode, type CSSProperties, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const colorBoxs = {
  "hotpink": {
    "color": "hotpink",
    "wireframe": "yellow"
  },
  "black": {
    "color": "black",
    "wireframe": "yellow"
  },
  "white": {
    "color": "white",
    "wireframe": "yellow"
  }
}

interface BoxProps {
  children?: ReactNode;
  position: number[];
  color: string;
  style?: CSSProperties;
}

function BoxOne({ color, position }: BoxProps) {
  const x = position[0] || 0;
  const y = position[1] || 0;
  const z = position[2] || 0;
  const colorBox = colorBoxs[color];
  return (
    <group>
      <mesh position={[x, y, z + 2 / 3]} scale={[1 / 3, 1 / 3, 1 / 3]}>
        <boxGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color={colorBox.wireframe} wireframe />
      </mesh>
      <mesh position={[x, y, z]}>
        <boxGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color={colorBox.wireframe} wireframe />
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


function BoxTwo({ color, position }: BoxProps) {
  const x = position[0] || 0;
  const y = position[1] || 0;
  const z = position[2] || 0;
  const colorBox = colorBoxs[color];
  return (
    <group>
      <mesh position={[x + 0.5, y, z]} scale={[2, 1, 1]}>
        <boxGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color={colorBox.wireframe} wireframe />
      </mesh>
      <mesh position={[x, y, z + 2 / 3]} scale={[1 / 3, 1 / 3, 1 / 3]}>
        <boxGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color={colorBox.wireframe} wireframe />
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
        <meshBasicMaterial attach="material" color={colorBox.wireframe} wireframe />
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

function BoxTwoDoc({ color, position }: BoxProps) {
  const x = position[0] || 0;
  const y = position[1] || 0;
  const z = position[2] || 0;
  const colorBox = colorBoxs[color];
  return (
    <group>
      <mesh position={[x, y + 0.5, z]} scale={[1, 2, 1]}>
        <boxGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color={colorBox.wireframe} wireframe />
      </mesh>
      <mesh position={[x, y, z + 2 / 3]} scale={[1 / 3, 1 / 3, 1 / 3]}>
        <boxGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color={colorBox.wireframe} wireframe />
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
        <meshBasicMaterial attach="material" color={colorBox.wireframe} wireframe />
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


function BoxThree({ color, position }: BoxProps) {
  const x = position[0] || 0;
  const y = position[1] || 0;
  const z = position[2] || 0;
  const colorBox = colorBoxs[color];
  return (
    <group>
      <mesh position={[x + 1, y, z]} scale={[3, 1, 1]}>
        <boxGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color={colorBox.wireframe} wireframe />
      </mesh>
      <mesh position={[x, y, z + 2 / 3]} scale={[1 / 3, 1 / 3, 1 / 3]}>
        <boxGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color={colorBox.wireframe} wireframe />
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
        <meshBasicMaterial attach="material" color={colorBox.wireframe} wireframe />
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
        <meshBasicMaterial attach="material" color={colorBox.wireframe} wireframe />
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



function BoxThreeDoc({ color, position }: BoxProps) {
  const x = position[0] || 0;
  const y = position[1] || 0;
  const z = position[2] || 0;
  const colorBox = colorBoxs[color];
  return (
    <group>
      <mesh position={[x, y + 1, z]} scale={[1, 3, 1]}>
        <boxGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color={colorBox.wireframe} wireframe />
      </mesh>
      <mesh position={[x, y, z + 2 / 3]} scale={[1 / 3, 1 / 3, 1 / 3]}>
        <boxGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color={colorBox.wireframe} wireframe />
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
        <meshBasicMaterial attach="material" color={colorBox.wireframe} wireframe />
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
        <meshBasicMaterial attach="material" color={colorBox.wireframe} wireframe />
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
  position: number[];
  show?: boolean;
  count: number;
  color: string;
  doc: number;
}

interface BoxGroupProps {
  boxGroup: any[];
  position: number[];
  show?: boolean;
}


interface BoxCubeProps {
  boxGroup: any[];
  position: number[];
  show?: boolean;
}


export const BoxDraw = ({ position, show, count, color, doc }: BoxDrawProps) => {
  if (show === false) {
    return (<></>)
  }
  switch (count) {
    case 1:
      return BoxOne({ color, position });
    case 2:
      if (doc) {
        return BoxTwoDoc({ color, position });
      }
      return BoxTwo({ color, position });
    case 3:
      if (doc) {
        return BoxThreeDoc({ color, position });
      }
      return BoxThree({ color, position });
  }
}

const BoxGroup = ({ position, boxGroup, show }: BoxGroupProps) => {

  const [scaleBox, setScaleBox] = useState([0, 0, 0])

  useEffect(() => {
    let s = [0, 0, 0]
    boxGroup.forEach((box) => {
      console.log('box', box)
      switch (box.count) {
        case 1:
          if (s[0] <= position[0]) s[0] = position[0] + 1;
          if (s[1] <= position[1]) s[1] = position[1] + 1;
          if (s[2] <= position[2]) s[2] = position[2] + 1;
          break;
        case 2:
          if (box.doc) {
            if (s[0] <= position[0]) s[0] = position[0] + 1;
            if (s[1] <= position[1]) s[1] = position[1] + 2;
            if (s[2] <= position[2]) s[2] = position[2] + 1;
          } else {
            if (s[0] <= position[0]) s[0] = position[0] + 2;
            if (s[1] <= position[1]) s[1] = position[1] + 1;
            if (s[2] <= position[2]) s[2] = position[2] + 1;
          }
          break;
        case 3:
          if (box.doc) {
            if (s[0] <= position[0]) s[0] = position[0] + 1;
            if (s[1] <= position[1]) s[1] = position[1] + 3;
            if (s[2] <= position[2]) s[2] = position[2] + 1;
          } else {
            if (s[0] <= position[0]) s[0] = position[0] + 3;
            if (s[1] <= position[1]) s[1] = position[1] + 1;
            if (s[2] <= position[2]) s[2] = position[2] + 1;
          }
          break;
      }
      // console.log('s', s)
      // s[0] = s[0] + 0.2;
      // s[2] = s[2] + 0.2;
      setScaleBox(s);
    })
  }, [boxGroup])


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
        return <BoxDraw {...box} position={positionNew} key={idx} />
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
        return <BoxGroup {...box} position={positionNew} key={idx} />
      })}
    </group>
  )
}
export default BoxCube;

