import React, { useContext, useState } from "react";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import CalculatorContext from '../context/CalculatorContext';
import FormHelperText from '@material-ui/core/FormHelperText';



export default() => {

    const { setTorque, nextStep, torque } = useContext(CalculatorContext);
    
    const [ rawTorque, setRawTorque ] = useState<string>(torque ? torque.toString() : '');
    const [ showError, setShowError ] = useState<boolean>(false);

    const numberRegex = RegExp(/^[1-9]\d*$/);

    const onTorqueChange = (value: string) => {
        setRawTorque(value);
        setShowError(!numberRegex.test(value));
    }

    const onBtnClickContinue = () => {
        setTorque(parseInt(rawTorque));
        nextStep();
    }


    return(
        <React.Fragment>
            <FormControl error={showError}>
            <InputLabel htmlFor="standard-adornment-password">Moment</InputLabel>
                <Input
                    id="standard-adornment-password"
                    value={rawTorque}
                    type="number"
                    onChange={(e) => onTorqueChange(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <InputAdornment position="end">NM</InputAdornment>
                        </InputAdornment>}/>
                        { showError && 
                            <FormHelperText id="component-error-text">Oppgi verdien som heltall</FormHelperText>
                        }
            </FormControl><br/><br/>
            <Button 
                variant="outlined"
                onClick={onBtnClickContinue}
                disabled={ rawTorque.length < 1 || showError }
                color="primary">Fortsett
            </Button>
        </React.Fragment>
    );
    
}