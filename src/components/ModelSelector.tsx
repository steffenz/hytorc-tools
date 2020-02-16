import React from "react";
import { Tool, Model } from "../types";
import styled from 'styled-components';

interface Props {
    tool: Tool
    torque: number
    onChange: (result: number) => void
}

const List = styled.ul`
    padding:0;
    margin:0;
`

const ListItem = styled.li`
    cursor: pointer;
    color: blue;
    text-decoration: underline;
    list-style:none;
    
` 

export default({ tool, torque, onChange }: Props) => {

    const onModelClick = (model: Model) => {

        let closestPreset = undefined; 
        for(var i = 0; i <= model.presets.length; i++){
            if(model.presets[i].nm >= torque){
                closestPreset = model.presets[i];
                break;
            }
        }

        if(closestPreset){
            let result = Math.round((closestPreset.psi * torque) / closestPreset.nm);
            onChange(result);
        }

    }


    return(
        <List>
            { tool.models.map(model => (
                <ListItem onClick={() => onModelClick(model)} key={model.name}>
                    {tool.name} {model.name }
                </ListItem>
            ))}
        </List>
    )
}