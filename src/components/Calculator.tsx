import React from "react";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import { SetTorque, SelectTool, SelectModel, Result } from './steps';
import { CalculatorStep } from './../types';
import Context from './context/CalculatorContext';
import { useTranslation } from 'react-i18next';

export default(() => {

    const { t } = useTranslation();

    const steps:CalculatorStep[] = [
        { 
            title: t('steps.selectTorque.stepTitle'),
            component: <SetTorque/>
        },
        {
            title: t('steps.selectTool.stepTitle'),
            component: <SelectTool/>
        },
        {
            title: t('steps.selectModel.stepTitle'),
            component: <SelectModel/>
        },
        {
            title: t('steps.result.stepTitle'),
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