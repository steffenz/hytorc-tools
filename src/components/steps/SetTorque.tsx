import React, {  useContext } from "react";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import CalculatorContext from '../context/CalculatorContext';


export default() => {

    const { setTorque, torque, nextStep } = useContext(CalculatorContext);

    return(
        <React.Fragment>
            <FormControl>
            <InputLabel htmlFor="standard-adornment-password">Moment</InputLabel>
                <Input
                    id="standard-adornment-password"
                    value={torque}
                    type="number"
                    onChange={(e) => { setTorque(parseInt(e.target.value)) }}
                    endAdornment={
                        <InputAdornment position="end">
                            <InputAdornment position="end">NM</InputAdornment>
                        </InputAdornment>}/>
            </FormControl><br/><br/>
            <Button 
                variant="outlined"
                onClick={() => nextStep() }
                disabled={ torque && torque > 0 ? false: true }
                color="primary">Fortsett
            </Button>
        </React.Fragment>
    );
    
}