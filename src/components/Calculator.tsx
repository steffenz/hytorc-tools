import React from "react";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import { SetTorque, SelectTool, SelectModel, Result } from './steps';
import { CalculatorStep } from './../types';
import Context from './context/CalculatorContext';

export default(() => {

    const steps:CalculatorStep[] = [
        { 
            title: 'Angi moment (N)',
            component: <SetTorque/>
        },
        {
            title: 'Velg verktøy (N)',
            component: <SelectTool/>
        },
        {
            title: 'Velg modell (N)',
            component: <SelectModel/>
        },
        {
            title: ' Resultat',
            component: <Result/>
        }
    ]

    const { step } = React.useContext(Context);
    
    return(
        <Stepper activeStep={step} orientation="vertical">
            { steps.map((step,key) => (
                <Step key={key}>
                    <StepLabel style={{ cursor: 'pointer'}}>{step.title}</StepLabel>
                    <StepContent>{step.component}</StepContent>                    
                </Step>
            )) }
        </Stepper>
    )
});