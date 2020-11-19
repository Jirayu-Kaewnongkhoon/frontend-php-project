import React from 'react';
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
    },
    {
        label: 'Job Request Form',
        icon: <LibraryBooksIcon />,
        url: 'job-request',
        role: ['User'],
    },
    {
        label: 'History',
        icon: <HistoryIcon />,
        url: 'history',
        role: ['User', 'Head', 'Staff'],
    },
    {
        label: 'Reports',
        icon: <AssessmentIcon />,
        url: 'reports',
        role: ['Head', 'Staff'],
    },
]

export const secondaryMenu = [
    {
        label: 'About',
        icon: <InfoIcon />,
        url: 'about',
    },
    {
        label: 'Logout',
        icon: <ExitToAppIcon />,
        url: 'login',
    },
]