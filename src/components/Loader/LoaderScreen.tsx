"use client";
import { useEffect, useState } from "react";
import Logo from "@/assets/Vortelassets/LogoBlack_1.svg";
import useWindowDimensions from "@/hooks/useWindowDimensions";

export default function LoaderScreen() {
  const [opacities, setOpacities] = useState<number[]>([]);
  const { width, height } = useWindowDimensions();
  const imageSize = 100; // Size of each image (width and height)

  // Calculate the number of images needed to cover the screen
  const numImagesX = Math.ceil(width / imageSize);
  const numImagesY = Math.ceil(height / imageSize);
  const totalImages = numImagesX * numImagesY;

  useEffect(() => {
    setOpacities(Array(totalImages).fill(0.01));
  }, [totalImages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacities(opacities.map(() => Math.random() * 0.2));
    }, 1000);

    return () => clearInterval(interval);
  }, [opacities]);

  return (
    <div className="fixed w-full h-full flex justify-center items-center ">
      <div className="fixed inset-5 w-full h-full flex flex-wrap">
        {Array(totalImages)
          .fill(null)
          .map((_, index) => (
            <img
              draggable={false}
              key={index}
              width={imageSize}
              height={imageSize}
              src={Logo.src}
              alt=""
              className="transition-all duration-1000 m-0 p-0"
              style={{
                opacity: opacities[index] ?? 0.1,
                zIndex: 0,
                position: "relative",
              }}
            />
          ))}
      </div>
    </div>
  );
}
