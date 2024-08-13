//importaciones de react
import React, { useEffect, useRef } from 'react';

const Slider = ({ min = 0, max = 10, step = 1, postfix = "", initialValue = 5, onChange }) => {
    const sliderRef = useRef(null);

    useEffect(() => {
        $(sliderRef.current).ionRangeSlider({
            min: min,
            max: max,
            from: initialValue,
            step: step,
            postfix: postfix,
            onChange: (data) => {
                if (onChange) {
                    onChange(data.from);
                }
            },
        });

        return () => {
            const sliderInstance = $(sliderRef.current).data("ionRangeSlider");
            if (sliderInstance) sliderInstance.destroy();
        };
    }, [min, max, step, postfix, initialValue, onChange]);

    return (
        <input type="text"  ref={sliderRef} />
    )
}

export default Slider