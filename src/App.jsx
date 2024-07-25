// import React from 'react'
import { ShaderGradientCanvas, ShaderGradient } from "shadergradient";
import * as reactSpring from "@react-spring/three";
import * as drei from "@react-three/drei";
import * as fiber from "@react-three/fiber";
import MusicPlayerSlider from "./components/musicPlayer";
import { Bot, Github, Mail, Search, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import { makeGetRequest } from '../api/axios-request'; // Importing the function from axios-request.js
import './App.css'

function App() {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await makeGetRequest(); // Call the function to fetch data
        setNewsData(data.results.slice(0, 2));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs once on component mount

  console.log(newsData);
  return (
    <>
      <div className="h-dvh flex flex-col justify-between">
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
              <p className="bg-[url('/public/assets/logo.png')] w-28 h-14 bg-contain bg-no-repeat m-auto"></p>
            </div>
          </div>
        </div>



        <div className="flex z-50 h-full relative">

          <div className="border-r-white border-r flex-1 flex flex-col gap-10 justify-center items-center">

            <div className="w-fit flex gap-3 bg-[#161616]/40 backdrop-blur-md p-2 rounded-3xl">
              <div className="flex flex-col gap-3">
                <div className="bg-black/40 w-60 h-2/4 flex justify-center items-center rounded-2xl">
                  <Mail />
                </div>
                <div className="bg-black/40 w-60 h-2/4 flex justify-center items-center rounded-2xl">
                  <Twitter />
                </div>
              </div>
              <div className="bg-custom-gradient w-56 h-56 flex justify-center items-center rounded-2xl">
                <Github size={60} />
              </div>
            </div>

            <div>
              <div className="relative">
                <input
                  className="bg-black/40 backdrop-blur-md w-[485px] h-10 p-4 pl-10 flex justify-center items-center rounded-lg border placeholder-gray-400 text-white"
                  type="search"
                  placeholder="Where do you wanna go today?"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search />
                </div>
                <button className="absolute inset-y-0 right-0 m-auto h-fit flex items-center mr-2 bg-white rounded-lg text-sm p-1 px-5 text-black">
                  search
                </button>
              </div>
            </div>

            <h1 className="text-6xl w-[485px] leading-snug">Meet the web again</h1>

          </div>



          <div className="border-l flex-1 flex flex-col gap-10 justify-center items-center">

            <div className="flex flex-col gap-10 bg-[#192C3D] p-10 w-4/5 h-4/5 rounded-3xl border bg-[url('./assets/aibg.jpg')] bg-cover bg-blend-multiply bg-center ">

              <div className="flex justify-center items-center gap-5">
                <Bot />
                <p className="text-3xl font-thin">Hey Milan how&apos;s your day going</p>
              </div>

              <input
                className="bg-black/40 backdrop-blur-md w-full h-12 p-4 pl-10 flex justify-center items-center rounded-2xl text-center border placeholder-gray-400 text-white"
                type="search"
                placeholder="Talk to our ai "
              />

              <div className="h-36 p-5 px-20 bg-black/40 rounded-3xl flex gap-20 justify-center items-center">
                <img src="https://www.google.com/s2/favicons?domain=figma.com&sz=40" alt="" />
                <img src="https://www.google.com/s2/favicons?domain=youtube.com&sz=40" alt="" />
                <img src="https://www.google.com/s2/favicons?domain=x.com&sz=40" alt="" />
                <img src="https://www.google.com/s2/favicons?domain=whatsapp.com&sz=40" alt="" />
                <img src="https://www.google.com/s2/favicons?domain=savee.it&sz=40" alt="" />
              </div>
              {isLoading ? <p>Loading...</p> :
                <ul className="list-disc text-2xl p-5 rounded-3xl flex flex-col gap-5">
                  {newsData.map((article, index) => (
                    <li key={index}>{article.title}</li>
                  ))}
                </ul>}
            </div>



          </div>
        </div>

        <div className="flex z-50 items-center justify-center relative h-20 border-t-2">
          <div className="border-r-1 px-10 flex justify-center items-center">100 cookies blocked</div>
          <div className="w-[2px] h-5 bg-white rounded-md"></div>
          <div className="border-r-1 px-10 flex justify-center items-center">34Mbps & 20Mbps </div>
          <div className="w-[2px] h-5 bg-white rounded-md"></div>
          <div className="border-r-1 px-10 flex justify-center items-center">weather is rainy today</div>
          <div className="w-[2px] h-5 bg-white rounded-md"></div>
          <div className="border-r-1 px-10 flex justify-center items-center">you have visited 2700 unique websites</div>
          <div className="w-[2px] h-5 bg-white rounded-md"></div>
          <div className="border-r-1 px-10 flex justify-center items-center">you have spent 300 hours and 47 minutes here with us</div>
          {/* <div className="w-[2px] h-5 bg-white rounded-md"></div> */}
        </div>
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
