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
            title: 'Angi moment',
            component: <SetTorque/>
        },
        {
            title: 'Velg verktøy',
            component: <SelectTool/>
        },
        {
            title: 'Velg modell',
            component: <SelectModel/>
        },
        {
            title: ' Anbefalt pumpetrykk',
            component: <Result/>
        }
    ]

    const { step, setStep } = React.useContext(Context);
    
    return(
        <Stepper activeStep={step} orientation="vertical">
            { steps.map((item,key) => (
                <Step key={key}>
                    <StepLabel style={ key < step ? { cursor: 'pointer'} : { cursor: 'not-allowed'}} onClick={ () => { if(key < step){ setStep(key) }} }>{item.title}</StepLabel>
                    <StepContent>{item.component}</StepContent>                    
                </Step>
            )) }
        </Stepper>
    )
});