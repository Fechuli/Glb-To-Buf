import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

function Model() {
  const [model, setModel] = useState(null);

  useEffect(() => {
    fetch("/Jet.buf")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.arrayBuffer();
      })
      .then(buffer => {
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("/draco/");
        loader.setDRACOLoader(dracoLoader);

        loader.parse(buffer, "", (gltf) => {
          setModel(gltf.scene);
        }, (error) => {
          console.error("An error happened while parsing the glTF:", error);
        });
      })
      .catch(error => {
        console.error("Error fetching the .buf file:", error);
      });
  }, []);

  return model ? <primitive object={model} /> : null;
}

const App = () => {
  return (
    <Canvas>
      <OrbitControls />
      <Model />
      <ambientLight />
    </Canvas>
  );
};

export default App;
