

import React, { useEffect } from "react";


const useDebounce = (value, delay = 400) => {
    const [debounceValue, setDebounceValue] = React.useState(value);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(value)
        }, delay);

        return () => clearTimeout(timer);
    },[value, delay])

    return debounceValue;
}

export default useDebounce;