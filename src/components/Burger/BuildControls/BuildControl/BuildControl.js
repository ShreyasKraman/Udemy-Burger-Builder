import React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import classes from './BuildControl.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <Grid container spacing={24}>
            <Grid item xs={4}>
                <div>{props.label}</div>
            </Grid>
            <Grid item xs={4}>
                <Button variant="contained" color="primary" onClick={props.added}>More</Button>
            </Grid>
            <Grid item xs={4}>
                <Button variant="contained" color="secondary" onClick={props.removed} disabled={props.disabled}>Less</Button>
            </Grid>
        </Grid>
    </div>
);

export default buildControl;