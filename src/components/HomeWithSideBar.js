import React from 'react';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import { authenticationService } from '../services/authenticationService';
import { createBrowserHistory } from 'history';
import { allMenu } from '../constants/menu';
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
                {allMenu.map((menu, index) => (
                    <Link key={menu.url} to={`/${menu.url}`} className={classes.link} >
                        <ListItem button>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={menu.label} />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
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
                                <Button 
                                    color="inherit"
                                    onClick={() => {
                                        authenticationService.logout();
                                        history.push('/login');
                                    }}
                                >
                                    Logout
                                </Button>
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
