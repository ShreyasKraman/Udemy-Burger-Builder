import React from 'react';

import Button from '@material-ui/core/Button';

import classes from './BuildControl.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div>{props.label}</div>
        <Button variant="contained" color="primary">More</Button>
        <Button variant="contained" color="Secondary">Less</Button>
    </div>
);

export default buildControl;