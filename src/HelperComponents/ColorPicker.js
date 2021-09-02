import React, { useCallback, useRef, useState } from "react";
import { RgbaColorPicker } from "react-colorful";

import useClickOutside from "./useClickOutside";

function rgbatohex(color){
    var r = color.r;
    var g = color.g;
    var b = color.b;
    var a = color.a;
    var outParts = [
      r.toString(16),
      g.toString(16),
      b.toString(16),
      Math.round(a * 255).toString(16).substring(0, 2)
    ];
  
    // Pad single-digit output values
    outParts.forEach(function (part, i) {
      if (part.length === 1) {
        outParts[i] = '0' + part;
      }
    })
  
    return ('#' + outParts.join(''));
}

export const PopoverPicker = ({ color, onChange }) => {
    const popover = useRef();
    const [isOpen, toggle] = useState(false);

    const close = useCallback(() => toggle(false), []);
    useClickOutside(popover, close);
	let colour = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

    return (
        <div className="picker">
            <div
                className="swatch surveyfunnel-lite-color-box"
                style={{ backgroundColor: colour }}
                onClick={() => toggle(true)}
            >
                <div className="surveyfunnel-lite-color-value">{rgbatohex(color)}</div>
            </div>

            {isOpen && (
                <div className="popover" ref={popover}>
                    <RgbaColorPicker color={color} onChange={onChange} />
                </div>
            )}
        </div>
    );
};
