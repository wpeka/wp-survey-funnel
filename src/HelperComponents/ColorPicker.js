import React, { useCallback, useRef, useState } from "react";
import { RgbaColorPicker } from "react-colorful";

import useClickOutside from "./useClickOutside";

export const PopoverPicker = ({ color, onChange }) => {
    const popover = useRef();
    const [isOpen, toggle] = useState(false);

    const close = useCallback(() => toggle(false), []);
    useClickOutside(popover, close);
	let colour = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    return (
        <div className="picker">
            <div
                className="swatch"
                style={{ backgroundColor: colour }}
                onClick={() => toggle(true)}
            />

            {isOpen && (
                <div className="popover" ref={popover}>
                    <RgbaColorPicker color={color} onChange={onChange} />
                </div>
            )}
        </div>
    );
};
