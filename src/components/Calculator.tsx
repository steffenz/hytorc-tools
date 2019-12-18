import React, { useEffect, useState } from "react";
import getTools from '../helpers/getTools';
import { Tool } from '../types';
import TorqueSelector from "./TorqueSelector";
import ToolSelector from "./ToolSelector";

export default(() => {

    const [ torque, setTorque ] = useState<number>(0);
    const [ allTools, setAllTools ] = useState<Tool[]>()
    const [ matchingTools, setMatchingTools] = useState<Tool[]>();
    const [ selectedTool, setSelectedTool ] = useState<Tool>();

    useEffect(() => { setAllTools(getTools()) }, [])


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

    const btnClick = () => {
        if(allTools){
            let tools = getToolsWithFilteredModelList(allTools, torque);
            setMatchingTools(tools);
        }
        

        // if(tools){
        //     tools.map(tool => {
        //         tool.models.map(model => {
        //             model.presets.map((previous, current) => {
        //                 if((current.nm - torque) < (previous.nm - torque)){
        //                     return current;
        //                 }
        //             })
        //         })
        //     })
        // }
    }
    

    return(
        <div>
            <TorqueSelector onChange={setTorque}/>

            Torque is now {torque}

            { allTools && <ToolSelector tools={allTools}/>}

            {/* { matchingTools && <ToolSelector tools={matchingTools}/> } */}
            
        </div>
    )
});