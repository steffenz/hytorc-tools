import React, { useContext } from "react";
import { Tool, Model } from '../../types';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import Button from '@material-ui/core/Button';

import CalculatorContext from './../context/CalculatorContext';

export default() => {    

    const { selectedTool, setSelectedModel, nextStep } = useContext(CalculatorContext);

    return(
        <React.Fragment>
            { selectedTool && 
                <ButtonGroup
                    orientation="vertical"
                    color="primary"
                    aria-label="vertical outlined primary button group">
                { selectedTool.models.map((model, key) => (
                    <Button key={key} onClick={() => { setSelectedModel(model); nextStep()}}>{selectedTool.name} {model.name}</Button>
                ))}
                </ButtonGroup>
            }

            { selectedTool && selectedTool.models.length < 1 ? 
            <React.Fragment>
                <Typography>Fant ingen passende modeller</Typography><br/>
                    <Button onClick={() => console.log('nope')} variant="outlined">Endre verktøy</Button>
            </React.Fragment> : ''}
            
        </React.Fragment>
    );
    
}