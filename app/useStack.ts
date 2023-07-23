import { useState } from "react";

function useStack<T>() {
    const [stack, setStack] = useState<T[]>([]);

    const push = (item: T) => setStack((prev) => [...prev, item]);

    const pop = () => {
        setStack((prev) => {
            if (prev.length === 0) {
                return prev;
            }

            return prev.slice(0, -1);
        });
    };

    const peek = () => {
        if (stack.length === 0) {
            return undefined;
        }

        return stack[stack.length - 1];
    };

    const clear = () => setStack([]);

    const length = stack.length;

    const isEmpty = stack.length === 0;

    return { push, pop, peek, stack, clear, length, isEmpty };
}

export default useStack;
