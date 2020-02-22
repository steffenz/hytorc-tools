import React from "react";
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

interface Props {
    title: string
}


export default({ title }: Props) => (
    <Step key={0}>
        <StepLabel style={{ cursor: 'pointer'}}>{title}</StepLabel>
            <StepContent>
                <p>Test</p>
            </StepContent>                    
    </Step>
)