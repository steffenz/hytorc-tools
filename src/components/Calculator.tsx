import React, { useEffect, useState } from "react";
import getTools from '../helpers/getTools';
import { Tool, Model } from '../types';
import { useTranslation } from 'react-i18next';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import { createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';
import { SetTorque, SelectTool, SelectModel, Result } from './steps';

const theme = createMuiTheme({
    palette: {
      primary: { main: '#db1f29'},
    }
  }); 


export default(() => {

    const [ torque, setTorque ] = useState<number>(0);
    const [ allTools, setAllTools ] = useState<Tool[]>([])
    const [ matchingTools, setMatchingTools] = useState<Tool[]>([]);
    const [ selectedTool, setSelectedTool ] = useState<Tool>();
    const [ result, setResult ] = useState<number>();

    const [ currentStep, setCurrentStep ] = useState<number>();

    const { t } = useTranslation();

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
    
    const onToolSelectMaterial = (tool: Tool) => {
        setSelectedTool(tool);
        setCurrentStep(2);
    }
    
    const onModelSelectMaterial = (model: Model) => {
        let closestPreset = undefined; 
        for(var i = 0; i <= model.presets.length; i++){
            if(model.presets[i].nm >= torque){
                closestPreset = model.presets[i];
                break;
            }
        }

        if(closestPreset){
            let result = Math.round((closestPreset.psi * torque) / closestPreset.nm);
            setCurrentStep(3);
            setResult(result);
        }

        else {
            alert('couldnt find closest preset. this shouldnt happen.')
        }
    }
    
    type CalculatorStep = {
        title: string
        component: React.ReactElement
    }

    const onTorqueChange = (torque: number) => {
        setTorque(torque);
        setMatchingTools(getToolsWithFilteredModelList(allTools ? allTools : [], torque));
        setCurrentStep(1);
    }

    const steps:CalculatorStep[] = [
        { 
            title: 'Angi moment (N)',
            component: <SetTorque onChange={onTorqueChange}/>
        },
        {
            title: 'Velg verktøy (N)',
            component: <SelectTool tools={matchingTools} onSelect={onToolSelectMaterial}/>
        },
        {
            title: 'Velg modell (N)',
            component: <SelectModel tool={selectedTool} onSelect={onModelSelectMaterial}/>
        },
        {
            title: ' Resultat',
            component: <Result result={result}/>
        }
    ]

    return(
        <ThemeProvider theme={theme}>
            <Stepper activeStep={currentStep} orientation="vertical">
                { steps.map((step,key) => (
                    <Step key={key}>
                        <StepLabel style={{ cursor: 'pointer'}}>{step.title}</StepLabel>
                        <StepContent>{step.component}</StepContent>                    
                    </Step>
                )) }
             </Stepper>
        </ThemeProvider>
    )
});