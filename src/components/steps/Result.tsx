import React, { useContext } from "react";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Alert from '@material-ui/lab/Alert';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CalculatorContext from '../context/CalculatorContext';
import { useTranslation } from 'react-i18next';


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
    const { t } = useTranslation();
    
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
                    <Typography variant="h6">{t('steps.result.recommendedPumpPressure')}</Typography>
                    <Typography variant="h2">{result} {t('steps.result.pumpPressureUnit')}</Typography>
                    { selectedTool && selectedModel && 
                        <Typography variant="subtitle2">
                            {
                                t('steps.result.resultDescription', { 
                                    tool: selectedTool.name,
                                    model: selectedModel.name,
                                    torque,
                                    unit: t('steps.selectTorque.torqueUnit')
                                })
                            }
                        </Typography>
                    }
                    <br/>
                    <Alert severity="error">
                        <strong>{t('steps.result.disclaimerTitle')}</strong>
                        {t('steps.result.disclaimerText')}
                    </Alert>
                </CardContent>
             </Card>
            <React.Fragment>
                <br/>
                <div>
                <Button onClick={previousStep} variant="contained">{t('steps.result.changeModel')}</Button> 
                <Button
                    onClick={() => setStep(0)}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >{t('steps.result.restart')}
                </Button>
                </div>
            </React.Fragment>
        </React.Fragment>
    );
    
}