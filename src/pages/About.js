import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import logo from '../constants/Logo.png'

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(8),
    },
    logo: {
        height: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));

function About() {

    const classes = useStyles();

    useEffect(() => {
        document.title = 'Fix Me : About';
    }, [])

    return (
        <div>
            <Container className={classes.cardGrid} maxWidth='md'>
                <div className={classes.logo}>
                    <img src={logo} alt="logo" width='500px' />
                    <Typography variant='h6'>
                        {`Version: 1.0.0`}
                    </Typography>
                </div>
            </Container>
        </div>
    )
}

export default About
