import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './Toolbar.css';
import Menu from '@material-ui/icons/Menu';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={classes.MobileOnly} onClick={props.open}><Menu/></div>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;