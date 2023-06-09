import { useState } from "react";
// Types of react
import type { MouseEventHandler } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { random } from "lodash";

// Components
import { LazyImage } from "@/components/LazyImage";

// generate a random function between 1 and 123
const generateRandom = () => random(1, 123);

// generate simple unique id
const generateId = () => Math.random().toString(36).substring(2, 9);

// define the type of the state
interface ImageItem {
  id: string;
  url: string;
}

const Home: NextPage = () => {
  // useState with generic type to define the type of the state
  const [images, setImages] = useState<ImageItem[]>([]);

  // function to add new fox, is type MouseEventHandler
  const addNewFox: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    const newImageItem: ImageItem = {
      id: generateId(),
      url: `https://randomfox.ca/images/${generateRandom()}.jpg`,
    };

    // update the state
    setImages([...images, newImageItem]);
    window.plausible(PlausibleEvents.ADD_FOX);
  };

  const handleLoaded = (node: HTMLImageElement) => {
    console.log("Image loaded ", node);
  };

  return (
    <>
      <Head>
        <title>React TypesScript</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Add Plausible to your site */}
        <script
          defer
          data-domain="youerdomain.com"
          src="https://plausible.io/js/plausible.js"
        ></script>
      </Head>

      <main>
        <h1 className="text-3xl font-bold underline">Hello React</h1>
        <button onClick={addNewFox}>Add new fox</button>
        {images.map(({ id, url }) => (
          <LazyImage
            key={id}
            src={url}
            alt={url + id}
            width={320}
            height="auto"
            className="rounded bg-gray-300"
            onClick={() => console.log("hola")}
            onLazyLoad={handleLoaded}
          />
        ))}
      </main>
    </>
  );
};

export default Home;
