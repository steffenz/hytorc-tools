import React, { useState } from "react";
import StepTemplate from "./../StepTemplate";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

interface Props {
    onChange: (torque: number) => void
}


export default({ onChange }: Props) => {

    const [ torque, setTorque ] = useState<string>('');

    const validateTorque = () => {
        if(torque?.match(/^[1-9]\d*$/)){
            onChange(parseInt(torque));
        }

        else {
            alert('invalid number!');
        }
    }
    
    return(
        <React.Fragment>
            <FormControl>
            <InputLabel htmlFor="standard-adornment-password">Moment</InputLabel>
                <Input
                    id="standard-adornment-password"
                    value={torque}
                    type="number"
                    onChange={(e) => { setTorque(e.target.value) }}
                    endAdornment={
                        <InputAdornment position="end">
                            <InputAdornment position="end">NM</InputAdornment>
                        </InputAdornment>}/>
            </FormControl><br/><br/>
            <Button 
                variant="outlined"
                onClick={validateTorque }
                disabled={ torque && torque.length > 0 ? false: true }
                color="primary">Fortsett
            </Button>
        </React.Fragment>
    );
    
}