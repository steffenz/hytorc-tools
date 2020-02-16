import React, { useEffect, useState } from "react";
import getTools from '../helpers/getTools';
import { Tool, Model } from '../types';
import TorqueSelector from "./TorqueSelector";
import ToolSelector from "./ToolSelector";
import ModelSelector from "./ModelSelector";
import { useTranslation } from 'react-i18next';
import styled, { createGlobalStyle } from 'styled-components';
import Button from '@material-ui/core/Button';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';

import SelectableTool from "./SelectableTool";
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import ReplayIcon from '@material-ui/icons/Replay';

import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';

const theme = createMuiTheme({
    palette: {
      primary: { main: '#db1f29'},
    }
  }); 


export default(() => {

    const [ torqueInput, setTorqueInput ] = useState<string>();
    const [ torque, setTorque ] = useState<number>(0);
    const [ allTools, setAllTools ] = useState<Tool[]>()
    const [ matchingTools, setMatchingTools] = useState<Tool[]>();
    const [ selectedTool, setSelectedTool ] = useState<Tool>();
    const [ result, setResult ] = useState<number>();

    const [ currentStep, setCurrentStep ] = useState<number>();

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
    
    const onToolSelectMaterial = (tool: Tool) => {
        setSelectedTool(tool);
        setCurrentStep(2);
    }
    
    const onModelSelectMaterial = (model: Model) => {
        console.log(model);


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

    const confirmNewInput = () => {

        let numberRegex = /^[1-9]\d*$/;
        if(torqueInput?.match(numberRegex)){
            setTorque(parseInt(torqueInput));
            setMatchingTools(getToolsWithFilteredModelList(allTools ? allTools : [], parseInt(torqueInput)));
            setCurrentStep(1);
        }

        else {
            alert('invalid number!');
        }
    }

    const restartApp = () => {
        setSelectedTool(undefined);
        setTorqueInput('');
        setTorque(0);
        setCurrentStep(0);
    }

    return(
                <ThemeProvider theme={theme}>
                <Stepper activeStep={currentStep} orientation="vertical">
                    <Step key="sup">
                            <StepLabel>Angi moment{ torque > 0 ? `: ${torque}` : ''}</StepLabel>
                            <StepContent>
                                <FormControl>
                                    <InputLabel htmlFor="standard-adornment-password">Moment</InputLabel>
                                    <Input
                                        id="standard-adornment-password"
                                        value={torqueInput}
                                        type="number"
                                        onChange={(e) => { setTorqueInput(e.target.value) }}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <InputAdornment position="end">PSI</InputAdornment>
                                        </InputAdornment>
                                        }
                                    />
                                </FormControl><br/><br/>
                                <Button 
                                    variant="outlined"
                                    onClick={confirmNewInput}
                                    disabled={ torqueInput && torqueInput.length > 0 ? false: true }
                                    color="primary">Fortsett</Button>
                        </StepContent>
                    </Step>
                    <Step key="sup">
                        <StepLabel>Velg verktøy{selectedTool ? `: ${selectedTool.name}` : ''}</StepLabel>
                        <StepContent>
                        <Grid container spacing={1} style={{ maxWidth: '900px'}}>
                                { matchingTools?.map(tool => (
                                    <Grid item xs={3}>
                                        <SelectableTool onClick={onToolSelectMaterial} tool={tool}/>
                                    </Grid>
                                ))}
                        </Grid>
                        <br/>
                        <Button onClick={() => setCurrentStep(0)} variant="outlined">Endre moment</Button>
                        </StepContent>
                    </Step>
                    <Step key="sup">
                        <StepLabel>Velg modell</StepLabel>
                        <StepContent>
                             <ButtonGroup
                                orientation="vertical"
                                color="primary"
                                aria-label="vertical outlined primary button group">
                                    { selectedTool?.models.map(model => (
                                        <Button onClick={() => onModelSelectMaterial(model)}>{selectedTool.name} {model.name}</Button>
                                    ))}
                            </ButtonGroup>

                            { selectedTool && selectedTool.models.length < 1 ? 
                            <React.Fragment>
                                <Typography>Fant ingen passende modeller</Typography><br/>
                                <Button onClick={() => setCurrentStep(1)} variant="outlined">Endre verktøy</Button>
                            </React.Fragment> : ''}
                        </StepContent>
                    </Step>

                    <Step key="last">
                        <StepLabel>Resultat</StepLabel>
                        <StepContent>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                    {result} PSI
                                    </Typography>
                                    {/* <Typography variant="body2" component="p">
                                        Formel: (PSI * moment) / NM
                                    </Typography> */}
                                </CardContent>
                            </Card>
                            <br/>
                            <Button
                            onClick={restartApp}
                            variant="contained"
                            color="primary"
                            startIcon={<ReplayIcon/>}
                            >Start på nytt</Button>
                        </StepContent>
                    </Step>
                </Stepper>
                </ThemeProvider>
        
    )
});