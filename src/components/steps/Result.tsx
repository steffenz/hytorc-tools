import React, { useContext } from "react";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Alert from '@material-ui/lab/Alert';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CalculatorContext from '../context/CalculatorContext';


export default() => {    

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  }),
);

const classes = useStyles();

    const { selectedModel, selectedTool, torque, previousStep, setStep  } = useContext(CalculatorContext);
    
    let closestPreset = undefined;
    let result = undefined;
    if(selectedModel){
        for(var i = 0; i <= selectedModel.presets.length; i++){
            if(selectedModel.presets[i].nm >= torque){
                closestPreset = selectedModel.presets[i];
                break;
            }
        }
    }

    if(closestPreset){ result = Math.round((closestPreset.psi * torque) / closestPreset.nm) }

    return(
        <React.Fragment>
            <Card>
                <CardContent>
                    <Typography variant="h6">Anbefalt pumpetrykk</Typography>
                    <Typography variant="h2">{result} PSI</Typography>
                    { selectedTool && selectedModel && 
                        <Typography variant="subtitle2">Gjelder for {selectedTool.name} {selectedModel.name} med et moment på {torque} NM</Typography>
                    }
                    <br/>
                    <Alert severity="error"><strong>Vær forsiktig!</strong> Selv om vi gjør vårt ytterste for at informasjonen i dette oppslagsverket skal være så riktig som mulig tar vi forbehold om feil og mangler både av teknisk og menneskelig karakter. Informasjonen her bør anses som veiledende, og vi anbefaler alltid at du dobbeltsjekker at alt stemmer før du setter i gang.</Alert>
                </CardContent>
             </Card>
            <React.Fragment>
                <br/>
                <div>
                <Button onClick={previousStep} variant="contained">Endre modell</Button> 
                <Button
                    onClick={() => setStep(0)}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >Start på nytt
                </Button>
                </div>
            </React.Fragment>
        </React.Fragment>
    );
    
}