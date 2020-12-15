import React from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InfoIcon from '@material-ui/icons/Info';
import ViewListIcon from '@material-ui/icons/ViewList';
import HistoryIcon from '@material-ui/icons/History';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AssessmentIcon from '@material-ui/icons/Assessment';
import JobList from '../pages/JobList';
import JobRequestForm from '../pages/JobRequestForm';
import History from '../pages/History';
import Reports from '../pages/Reports';
import About from '../pages/About';
import Login from '../pages/Login';
import Assign from '../components/Assign';
import UpdateStatus from '../components/UpdateStatus';
import Home from '../pages/Home';

export const allMenu = [
    {
        label: 'Job List',
        icon: <ViewListIcon />,
        url: 'job-list',
        role: ['Head', 'Staff'],
        isPrimary: true,
        exact: true,
        component: JobList
    },
    {
        label: 'Job Request Form',
        icon: <LibraryBooksIcon />,
        url: 'job-request',
        role: ['User'],
        isPrimary: true,
        component: JobRequestForm
    },
    {
        label: 'History',
        icon: <HistoryIcon />,
        url: 'history',
        role: ['User', 'Head', 'Staff'],
        isPrimary: true,
        component: History
    },
    {
        label: 'Reports',
        icon: <AssessmentIcon />,
        url: 'reports',
        role: ['Head', 'Staff'],
        isPrimary: true,
        component: Reports
    },
    {
        label: 'About',
        icon: <InfoIcon />,
        url: 'about',
        role: ['User', 'Head', 'Staff'],
        component: About
    },
    {
        label: 'Logout',
        icon: <ExitToAppIcon />,
        url: 'login',
        role: ['User', 'Head', 'Staff'],
        component: Login
    },
    {
        url: '',
        role: ['User', 'Head', 'Staff'],
        exact: true,
        component: Home
    },
    {
        url: 'job-list/assign/:job_id',
        role: ['Head'],
        component: Assign
    },
    {
        url: 'job-list/update/:job_id',
        role: ['Staff'],
        component: UpdateStatus
    },
]