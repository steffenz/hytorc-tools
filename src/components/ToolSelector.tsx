import React from "react";
import { Tool } from './../types';
import styled from "styled-components";

const ToolList = styled.ul`
    list-style:none;
    margin:0;
    padding:0;
`

const SingleTool = styled.li`
    width:100px;
    height:100px;
    background:orange;
    display:flex;
    justify-content:center;
    align-content:center;
`

interface Props {
    tools: Tool[]
}

export default({ tools }: Props) => {
    return(
        <ToolList>
            { tools.map(tool => (
                <SingleTool key={tool.name}>{tool.name}</SingleTool>
            ))}
        </ToolList>
    )
}