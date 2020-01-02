import React from "react";
import { Tool } from './../types';
import styled from "styled-components";

const ToolList = styled.ul`
    list-style:none;
    margin:0;
    padding:0;
    display:grid;
    grid-row-gap: 20px;
    grid-template-columns: repeat(3, 1fr);
`

const SingleTool = styled.li<{ disabled: boolean}>`
    width:100px;
    height:100px;
    background: ${props => (props.disabled ? 'red': 'green')};
    opacity: ${props => (props.disabled ? '0.4': '1')};
    display:flex;
    justify-content:center;
    align-content:center;
`

interface Props {
    tools: Tool[],
    onChange: (tool: Tool) => void,
}



export default({ tools, onChange }: Props) => {
    
    const onToolSelect = (tool: Tool) => {
        if(tool.models.length > 0){
            onChange(tool);
        }  
    }

    return(
        <ToolList>
            { tools.map(tool => (
                <SingleTool 
                    onClick={() => onToolSelect(tool)}
                    disabled={tool.models.length < 1} 
                    key={tool.name}>{tool.name}
                </SingleTool>
            ))}
        </ToolList>
    )
}