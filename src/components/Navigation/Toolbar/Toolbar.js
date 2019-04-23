import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import classes from './Toolbar.css';

const toolbar = (props) => (
    <div className={classes.Root}>
        <AppBar position="static">
            <Toolbar>
                <IconButton className={classes.MenuButton} color="inherit" aria-label="Menu">
                    <MenuIcon>
                        Menu
                    </MenuIcon>
                    <div>Logo</div>
                    <div>...</div>
                </IconButton>
            </Toolbar>
        </AppBar>
    </div>
);

export default toolbar;