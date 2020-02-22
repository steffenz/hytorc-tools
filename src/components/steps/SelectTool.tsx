import React, { useContext } from "react";
import { Tool } from '../../types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { useTranslation } from 'react-i18next';


import CalculatorContext from './../context/CalculatorContext';


export default() => {    
    
    const useStyles = makeStyles({
        root: {
          maxWidth: 200,
        },
        media: {
          height: 140,
        },
      });

      const classes = useStyles();
      const { t } = useTranslation();

      const { tools, torque, setSelectedTool, nextStep, previousStep } = useContext(CalculatorContext);

      const getToolsWithFilteredModelList = (tools: Tool[], torque: number) => (
        tools.map(tool => (
            {...tool, models: getModelsWithinRange(tool, torque)}
        ))
    )

    const getModelsWithinRange = (tool: Tool, torque: number) => {
        return tool.models.filter(model => {
            let min = model.presets[0].nm;
            let max = model.presets[model.presets.length -1].nm;
            if(torque >= min && torque <= max){
                return model;
            }
        });
    }

    const filteredTools = getToolsWithFilteredModelList(tools, torque);


    return(
        <React.Fragment>
            <Grid container spacing={1} style={{ maxWidth: '900px'}}>
                { filteredTools.map((tool, key) => (
                    <Grid item key={key} xs={12} sm={6} md={3}>
                        <Card className={classes.root}>
                            <CardActionArea onClick={ () => { setSelectedTool(tool); nextStep()}}>
                                <CardContent>
                                <CardMedia
                                    className={classes.media}
                                    image={`./gfx/${tool.image}`}
                                    title={tool.name}/>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        { tool.name }
                                    </Typography>
                            </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                 ))}
            </Grid>
            <br/>
            <Button onClick={ previousStep } variant="outlined">{t('steps.selectTool.changeTorque')}</Button>
        </React.Fragment>
    );
    
}