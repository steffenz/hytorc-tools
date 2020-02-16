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

const SingleTool = styled.li<{ disabled: boolean, selected: boolean}>`
    /* background: ${props => (props.disabled ? 'red': 'green')}; */
    /* opacity: ${props => (props.disabled ? '0.4': '1')};
    cursor: ${props => (props.disabled ? 'not-allowed': 'pointer')};
    display:flex;
    justify-content:center;
    align-content:center; */
    width:100px;
    overflow:hidden;
    text-align: center;
    cursor: ${props => (props.disabled ? 'not-allowed': 'pointer')};
    opacity: ${props => (props.disabled ? '0.4': '1')};
    

    img {
        width:100px;
        height:100px;
        border-radius:100px;
        border: ${props => (props.selected ? '2px solid #db1f29': '2px solid #ccc')};
        display:block;
        box-sizing:border-box;
    }

`

interface Props {
    tools: Tool[],
    onChange: (tool: Tool) => void,
    selectedTool: Tool | undefined,
}



export default({ tools, onChange, selectedTool }: Props) => {
    
    const onToolSelect = (tool: Tool) => {
        if(tool.models.length > 0){
            onChange(tool);
        }  
    }

    return(
        <ToolList>
            { tools.map(tool => (
                <>
                <SingleTool 
                    onClick={() => onToolSelect(tool)}
                    disabled={tool.models.length < 1}
                    selected={selectedTool && selectedTool === tool ?  true : false}
                    key={tool.name}>
                        { tool.image &&
                            <img src={`./gfx/${tool.image}`}/>
                        }
                    <p>{tool.name}</p>
                </SingleTool>
                </>
            ))}
        </ToolList>
    )
}