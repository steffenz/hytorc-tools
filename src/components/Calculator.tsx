import React, { useEffect, useState } from "react";
import getTools from '../helpers/getTools';
import { Tool } from '../types';
import TorqueSelector from "./TorqueSelector";
import ToolSelector from "./ToolSelector";
import ModelSelector from "./ModelSelector";
import { useTranslation } from 'react-i18next';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

    html {
        font-size:10px;
    }

    body {
        background:#ccc;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size:1.4rem;
    }
`

const Wrapper = styled.div`
    background:#fff;
    width:500px;
    padding:20px;
`

const HelperText = styled.div`
    border:2px solid #ccc;
    padding:20px;
`

const Header = styled.header`
    h2, p {
        padding:0;
        margin:0;
    }

    h2 {
        font-size:2rem;
        font-weight:bold;
        padding-bottom:5px;
    }

    margin: 25px 0 25px 0;
` 


export default(() => {

    const [ torque, setTorque ] = useState<number>(0);
    const [ allTools, setAllTools ] = useState<Tool[]>()
    const [ matchingTools, setMatchingTools] = useState<Tool[]>();
    const [ selectedTool, setSelectedTool ] = useState<Tool>();
    const [ result, setResult ] = useState<number>();
    const { t } = useTranslation();

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
        <React.Fragment>
            <GlobalStyles/>
            <Wrapper>
                
                <Header>
                    <h2>{t('selectTorque.header')}</h2>
                    <p>{t('selectTorque.desc')}.</p>
                </Header>
                <TorqueSelector onChange={onTorqueChange}/>

                <Header>
                    <h2>{t('selectTool.header')}</h2>
                    <p>{t('selectTool.desc')}</p>
                </Header>
                { matchingTools && <ToolSelector onChange={onToolChange} tools={matchingTools} selectedTool={selectedTool}/>}
                                
                <Header>
                    <h2>{t('selectSize.header')}</h2>
                    <p>{t('selectSize.desc')}</p>
                </Header>

                { selectedTool && <ModelSelector tool={selectedTool} torque={torque} onChange={onModelChange}/> }
                { result && <div><b>Result: {result} PSI</b> </div>}
            </Wrapper>
        </React.Fragment>
        
    )
});