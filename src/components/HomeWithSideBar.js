import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';
import { authenticationService } from '../services/authenticationService';
import { createBrowserHistory } from 'history';
import { primaryMenu, secondaryMenu } from '../constants/menu';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 250,
    },
    link: {
        color: 'black',
        textDecoration: 'none'
    }
}));

function HomeWithSideBar() {
    const classes = useStyles();
    const history = createBrowserHistory({ forceRefresh: true });
    const currentUser = authenticationService.currentUserValue;

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(open);
    };

    const list = (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {primaryMenu.filter(menu => menu.role.includes(currentUser.role_name)).map((menu, index) => (
                    <Link key={menu.url} to={`/${menu.url}`} className={classes.link} >
                        <ListItem button>
                            <ListItemIcon>{menu.icon}</ListItemIcon>
                            <ListItemText primary={menu.label} />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                {secondaryMenu.map((menu, index) => (
                    <Link key={menu.url} to={`/${menu.url}`} className={classes.link} >
                        <ListItem button>
                            <ListItemIcon>{menu.icon}</ListItemIcon>
                            <ListItemText primary={menu.label} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );


    return (
        <div>
            {
                currentUser &&
                <div>
                    <div className={classes.root}>
                        <AppBar position="static">
                            <Toolbar>
                                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(true)} >
                                    <MenuIcon />
                                </IconButton>
                                <Typography variant="h6" className={classes.title}>
                                    News
                                </Typography>
                                <Avatar />
                                <Typography 
                                    color="inherit"
                                    onClick={() => {
                                        authenticationService.logout();
                                        history.push('/login');
                                    }}
                                >
                                    {currentUser.user_name}
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </div>
                    <div>
                        <Drawer anchor={'left'} open={open} onClose={toggleDrawer(false)}>
                            {list}
                        </Drawer>
                    </div>
                </div>
            }
        </div>
    );
}

export default HomeWithSideBar;
