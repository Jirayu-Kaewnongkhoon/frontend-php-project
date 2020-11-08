import React from 'react';
import History from "../pages/History";
import JobList from "../pages/JobList";
import JobRequestForm from "../pages/JobRequestForm";
import Login from "../pages/Login";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InfoIcon from '@material-ui/icons/Info';
import ViewListIcon from '@material-ui/icons/ViewList';
import HistoryIcon from '@material-ui/icons/History';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AssessmentIcon from '@material-ui/icons/Assessment';

export const primaryMenu = [
    {
        label: 'Job List',
        icon: <ViewListIcon />,
        url: 'job-list',
        role: ['Head', 'Staff'],
        component: JobList
    },
    {
        label: 'Job Request Form',
        icon: <LibraryBooksIcon />,
        url: 'job-request',
        role: ['User'],
        component: JobRequestForm
    },
    {
        label: 'History',
        icon: <HistoryIcon />,
        url: 'history',
        role: ['User', 'Head', 'Staff'],
        component: History
    },
    {
        label: 'Reports',
        icon: <AssessmentIcon />,
        url: 'reports',
        role: ['Head', 'Staff'],
        component: History
    },
]

export const secondaryMenu = [
    {
        label: 'About',
        icon: <InfoIcon />,
        url: 'about',
        component: Login
    },
    {
        label: 'Logout',
        icon: <ExitToAppIcon />,
        url: 'login',
        component: Login
    },
]