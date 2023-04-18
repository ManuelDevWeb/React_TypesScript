// Global type definitions for the app

// 1. Unicamente, has global lo que realmente es global en tu aplicación
// 2. No abusar de ellos, podrian crecer sin control
// 3. Empieza con tipos locales en cada componente, luego cuando se utilice en muchos lados lo agregas a global

type IFoxImageItem={
    src: string;
    onLazyLoad:? (node: HTMLImageElement) => void;
}