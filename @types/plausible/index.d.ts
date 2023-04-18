// Tipando el objeto window

enum PlausibleEvents {
    ADD_FOX = 'add_fox',
    REMOVE_FOX = 'remove_fox'
}

type Options={
    callback?: () => void;
    props: Record<string, string | number | undefined>;
}

interface Window {
    plausible: (event:PlausibleEvents, options?:Options) => void;
}