import Assign from "../components/Assign";
import History from "../pages/History";
import JobList from "../pages/JobList";
import JobRequestForm from "../pages/JobRequestForm";

export const allMenu = [
    {
        label: 'Job List',
        url: 'job-list',
        role: ['Head', 'Staff'],
        component: JobList
    },
    {
        label: 'Job Request Form',
        url: 'job-request',
        role: ['User'],
        component: JobRequestForm
    },
    {
        label: 'History',
        url: 'history',
        role: ['User', 'Head', 'Staff'],
        component: History
    },
    {
        label: 'Assign',
        url: 'assign',
        role: ['Head', 'Staff'],
        component: Assign
    },
]