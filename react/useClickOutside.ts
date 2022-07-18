import { useEffect } from "react";

function useOnClickOutside(ref:any, handler:any) {
    useEffect(
        () => {
            const listener = (event:any) => {
                // Do nothing if clicking another menu item
                if (event.target.className === "mainMenuItem") return;

                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target)) return;

                handler(event);
            };
            // @ts-expect-error
            document.addEventListener("mousedown", listener);
            // @ts-expect-error
            document.addEventListener("touchstart", listener);
            return () => {
                // @ts-expect-error
                document.removeEventListener("mousedown", listener);
                // @ts-expect-error
                document.removeEventListener("touchstart", listener);
            };
        },
        [ref, handler]
    );
}

export default useOnClickOutside;