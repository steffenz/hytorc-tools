import React from "react";
import { Tool, Model } from '../../types';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ReplayIcon from '@material-ui/icons/Replay';


interface Props {
    result: any
}

export default({ result }: Props) => {    

    return(
        <React.Fragment>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2">{result} PSI</Typography>
                </CardContent>
             </Card>
            <React.Fragment>
                <br/>
                <Button
                    onClick={() => console.log('bop')}
                    variant="contained"
                    color="primary"
                    startIcon={<ReplayIcon/>}
                >Start på nytt
                </Button>
            </React.Fragment>
        </React.Fragment>
    );
    
}