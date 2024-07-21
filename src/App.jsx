// import React from 'react'
import { ShaderGradientCanvas, ShaderGradient } from "shadergradient";
import * as reactSpring from "@react-spring/three";
import * as drei from "@react-three/drei";
import * as fiber from "@react-three/fiber";
import "./App.css"
import MusicPlayerSlider from "./components/musicPlayer";

function App() {
  return (
    <>
      <div className=" flex z-50 relative flex-col bg-transparent">
        <div className="flex justify-between border-x-0 border-y-2 border-t-0 text-white">
          <div className="p-5 text-3xl border border-y-0 border-l-0 flex items-center gap-14">
            <p>2nd July 2024</p>
            <p>6:35 PM</p>
          </div>
          <div className="p-5 w-[65%]">
            <MusicPlayerSlider />
          </div>
          <div className="p-5 border border-y-0 border-r-0 border-t-0 content-center">
            <p className="bg-[url('./assets/logo.png')] w-28 h-14 bg-contain bg-no-repeat m-auto"></p>
          </div>
        </div>
        <div></div>
        <div></div>
      </div>




      <div className="h-screen w-screen z-10 top-0 absolute pointer-events-none opacity-35">
        <p className="bg-[url('./assets/noise.webp')] object-cover h-screen"></p>
      </div>
      <div className="h-screen w-screen z-0 top-0 absolute pointer-events-none">
        <ShaderGradientCanvas
          importedFiber={{ ...fiber, ...drei, ...reactSpring, }}
          style={{
            position: "absolute",
            pointerEvents: "none",
            top: 0,
          }}
          className='pointer-events-none z-0'
        >
          <ShaderGradient
            control="query"
            urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23ff08ea&bgColor2=%2300b83a&brightness=1.2&cAzimuthAngle=250&cDistance=1.5&cPolarAngle=140&cameraZoom=12.5&color1=%2300400d&color2=%23005252&color3=%2300ebeb&embedMode=off&envPreset=dawn&fov=45&gizmoHelper=hide&grain=off&lightType=env&pixelDensity=2.2&positionX=0&positionY=0&positionZ=0&reflection=0.5&rotationX=0&rotationY=0&rotationZ=140&shader=defaults&type=sphere&uAmplitude=2.6&uDensity=0.7&uFrequency=5.5&uSpeed=0.1"
          />

        </ShaderGradientCanvas>
      </div>







    </>
  );
}
export default App;
