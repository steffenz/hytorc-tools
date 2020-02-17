import React from "react";
import { Tool, Model } from '../../types';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import Button from '@material-ui/core/Button';


interface Props {
    tool?: Tool,
    onSelect: (model: Model) => void
}

export default({ tool, onSelect }: Props) => {    

    return(
        <React.Fragment>
            { tool && 
                <ButtonGroup
                    orientation="vertical"
                    color="primary"
                    aria-label="vertical outlined primary button group">
                { tool.models.map((model, key) => (
                    <Button key={key} onClick={() => onSelect(model)}>{tool.name} {model.name}</Button>
                ))}
                </ButtonGroup>
            }

            { tool && tool.models.length < 1 ? 
            <React.Fragment>
                <Typography>Fant ingen passende modeller</Typography><br/>
                    <Button onClick={() => console.log('nope')} variant="outlined">Endre verktøy</Button>
            </React.Fragment> : ''}
            
        </React.Fragment>
    );
    
}