import { useEffect } from "react";
import { canUseDOM } from "vtex.render-runtime";

function useOnClickOutside(ref: any, handler: any) {
    useEffect(
        () => {
            if (!canUseDOM) return;
            const listener = (event: any) => {
                // Do nothing if clicking another menu item
                if (event.target.className === "mainMenuItem") return;

                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target)) return;

                handler(event);
            };

            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        },
        [ref, handler]
    );
}

export default useOnClickOutside;