import React, { useEffect, useState } from "react";
import getTools from '../helpers/getTools';
import { Tool } from '../types';
import TorqueSelector from "./TorqueSelector";
import ToolSelector from "./ToolSelector";
import ModelSelector from "./ModelSelector";

export default(() => {

    const [ torque, setTorque ] = useState<number>(0);
    const [ allTools, setAllTools ] = useState<Tool[]>()
    const [ matchingTools, setMatchingTools] = useState<Tool[]>();
    const [ selectedTool, setSelectedTool ] = useState<Tool>();
    const [ result, setResult ] = useState<number>();

    useEffect(() => { setAllTools(getTools()) }, [])

    const onTorqueChange = (newTorque:number): void => {
        setResult(undefined);
        setSelectedTool(undefined);
        setTorque(newTorque);
        if(allTools){
            let tools = getToolsWithFilteredModelList(allTools, newTorque);
            setMatchingTools(tools);
        }
    }


    const getToolsWithFilteredModelList = (tools: Tool[], torque: number) => (
        tools.map(tool => (
            {...tool, models: getModelsWithinRange(tool, torque)}
        ))
    )

    const getModelsWithinRange = (tool: Tool, torque: number) => {
        return tool.models.filter(model => {
            let min = model.presets[0].nm;
            let max = model.presets[model.presets.length -1].nm;
            if(torque >= min && torque <= max){
                return model;
            }
        });
    }

    const onToolChange = (tool: Tool) => {
        setResult(undefined);
        setSelectedTool(tool);
    }

    const onModelChange = (result: number) => {
        setResult(result);
    }
    

    return(
        <div>
            <TorqueSelector onChange={onTorqueChange}/>
            { matchingTools && <ToolSelector onChange={onToolChange} tools={matchingTools}/>}
            { selectedTool && <ModelSelector tool={selectedTool} torque={torque} onChange={onModelChange}/> }
            { result && <div>Result: {result} </div>}
        </div>
    )
});