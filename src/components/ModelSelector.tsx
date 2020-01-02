import React from "react";
import { Tool, Model } from "../types";

interface Props {
    tool: Tool
    torque: number
    onChange: (result: number) => void
}

export default({ tool, torque, onChange }: Props) => {

    const onModelClick = (model: Model) => {
       console.warn('The formula is missing - only returning dummy data');
       onChange(1337);
    }

    return(
        <ul>
            { tool.models.map(model => (
                <li onClick={() => onModelClick(model)} key={model.name}>
                    {tool.name} {model.name }
                </li>
            ))}
        </ul>
    )
}