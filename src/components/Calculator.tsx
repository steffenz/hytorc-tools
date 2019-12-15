import React, { useEffect, useState } from "react";
import getTools from '../helpers/getTools';
import { Tool } from '../types';

export default(() => {

    const [ torque, setTorque ] = useState<number>(0);
    const [ allTools, setAllTools ] = useState<Tool[]>()
    const [ matchingTools, setMatchingTools] = useState<Tool[]>();

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
            <input 
                type="text"
                onChange={(e) => setTorque(parseInt(e.target.value))}
                value={torque}
                placeholder="Enter torque .."/>
            <button onClick={btnClick}>Go</button>


            { matchingTools && matchingTools.map(tool => (
                <div>
                    {tool.name}
                    {tool.models.map(model =>
                        <p>{model.name}</p>)}
                </div>
            ))}
        </div>
    )
});