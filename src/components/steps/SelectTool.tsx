import React from "react";
import { Tool } from '../../types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

interface Props {
    tools: Tool[],
    onSelect: (tool: Tool) => void
}

// <SelectableTool onClick={() => console.log('nab')} tool={tool}/>

export default({ tools, onSelect }: Props) => {    
    
    const useStyles = makeStyles({
        root: {
          maxWidth: 200,
        },
        media: {
          height: 140,
        },
      });

      const classes = useStyles();

    return(
        <React.Fragment>
            <Grid container spacing={1} style={{ maxWidth: '900px'}}>
                { tools.map((tool, key) => (
                    <Grid item xs={3} key={key}>
                        <Card className={classes.root}>
                            <CardActionArea onClick={ () => onSelect(tool)}>
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
            <Button onClick={() => console.log('lol')} variant="outlined">Endre moment</Button>
        </React.Fragment>
    );
    
}