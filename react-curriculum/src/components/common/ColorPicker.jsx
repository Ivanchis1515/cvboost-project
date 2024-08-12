//importaciones de react
import React from 'react';

const ColorPicker = ({ onSelect, colors }) => {
    return (
        <>
            <div className="color-picker-wrap">
                <ul className="color-pick list-inline">
                    {colors.map((color, index) => (
                        <li
                            key={index}
                            className={`list-inline-item p-3`}
                            style={{ cursor: 'pointer', width: '35px', height: '35px', borderRadius:'100%', backgroundColor:color }}
                            onClick={() => onSelect(color)}
                        >
                            &nbsp;
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default ColorPicker