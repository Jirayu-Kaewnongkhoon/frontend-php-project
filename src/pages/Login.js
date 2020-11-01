import React, { useEffect } from 'react'
import { authenticationService } from '../services/authenticationService';
import { createBrowserHistory } from 'history';

// login template
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// import './Login.css'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://e-file.huawei.com/-/media/EBG/Images/case-study/cases_study_banner/How%20Did%20Huawei%20Build%20the%20100G%20SDN%20Campus%20Network%20for%20KMITL%20of%20Thailand-revised-banner-list.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Login() {

    const classes = useStyles();
    const currentUser = authenticationService.currentUserValue;
    const history = createBrowserHistory({ forceRefresh: true });

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    // const [isLogin, setLogin] = React.useState(true);

    useEffect(() => {
        if (currentUser) {
            // setLogin(false)
            history.push('/')
        }
    }, [currentUser, history])

    const onSubmitClick = (e) => {
        e.preventDefault();
        authenticationService.login(username, password)
            .then(user => {
                if (user.role_name === "User") {
                    history.push('/job-request')
                }

                if (user.role_name === "Head" || user.role_name === "Staff") {
                    history.push('/job-list')
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            {
                !currentUser &&
                <Grid container component="main" className={classes.root}>
                    <CssBaseline />
                    <Grid item xs={false} sm={4} md={7} className={classes.image} />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Login
                            </Typography>
                            <form className={classes.form} noValidate onSubmit={onSubmitClick} >
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Grid container>
                                    <Grid item xs >
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Login
                                </Button>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            }
        </div>
    );
}

export default Login