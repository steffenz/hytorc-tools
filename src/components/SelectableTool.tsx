import React from "react";
import { Tool } from "../types";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


interface Props {
    tool: Tool
    onClick: (tool: Tool) => void 
}



export default({ tool, onClick }: Props) => {

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
        <Card className={classes.root}>
            <CardActionArea onClick={ () => onClick(tool)}>
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
    )
}