import { useRef, useEffect, useState } from "react";

interface Props {
  image: string;
  alt: string;
}

export const RandomFox = ({ image, alt }: Props): JSX.Element => {
  // useRef is to do reference to the DOM element
  const node = useRef<HTMLImageElement>(null);

  const [src, setSrc] = useState<string>(
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
  );

  // useEffect is executed after the component is rendered
  useEffect(() => {
    // New observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // If the image is visible in the viewport (Browser)
        if (entry.isIntersecting) {
          // If the image is visible, set the src
          setSrc(image);
        }
      });
    });

    // Observe node
    if (node.current) {
      observer.observe(node.current);
    }

    // Disconnect observer
    return () => {
      observer.disconnect();
    };
  }, [image]);

  return (
    <img
      ref={node}
      width={320}
      height="auto"
      src={src}
      alt={alt}
      className="rounded bg-gray-300"
    />
  );
};
