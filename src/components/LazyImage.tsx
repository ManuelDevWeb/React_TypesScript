import { type } from "os";
import { useRef, useEffect, useState } from "react";
// Types of react
import type { ImgHTMLAttributes } from "react";

// interface to define the props and extends the ImgHTMLAttributes (onClick, onMouseOver, etc)
interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  onLazyLoad?: (node: HTMLImageElement) => void;
}

// ...imgProps is to pass all the props to the img tag (onClick, onMouseOver, etc)
export const LazyImage = ({
  src,
  alt,
  onLazyLoad,
  ...imgProps
}: Props): JSX.Element => {
  // useRef is to do reference to the DOM element
  const node = useRef<HTMLImageElement>(null);

  const [currentSrc, setCurrentSrc] = useState<string>(
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
          setCurrentSrc(src);
          // Send entry target to the onLazyLoad function
          onLazyLoad && onLazyLoad(node.current as HTMLImageElement);
          // Indicate that it's doesn't need to observe the node anymore
          observer.unobserve(node.current as HTMLImageElement);
        }
      });
    });

    // Observe node (node is the reference to the DOM element)
    node.current && observer.observe(node.current);

    // Disconnect observer
    return () => {
      observer.disconnect();
    };
  }, [src]);

  return (
    <img
      ref={node}
      src={currentSrc}
      alt={alt}
      // Pass all the props to the img tag (onClick, onMouseOver etc)
      {...imgProps}
    />
  );
};
