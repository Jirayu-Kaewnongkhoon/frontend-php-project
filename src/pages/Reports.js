import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { jobService } from '../services/jobService'
import { monthList } from '../constants/month';
import { authenticationService } from '../services/authenticationService';
import ReportsTable from '../components/ReportsTable';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(8),
    },
    head: {
        '& > *': {
            fontSize: 16,
        },
    },
    option: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: 20
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

function Reports() {

    const classes = useStyles()

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([]);
    const [month, setMonth] = React.useState(new Date().getMonth()+1);

    useEffect(() => {
        document.title = "Fix Me : Reports";
        jobService.getReports()
            .then(res => setRows(res))
            .catch(err => console.log(err))
    }, [])

    const handleChangeMonth = (event) => {
        setMonth(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDownloadClick = () => {
        jobService.getReportsPDF(month, authenticationService.currentUserValue.user_name)
            .then(res => {
                const url = window.URL.createObjectURL(new Blob([res]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Reports ' + new Date().toLocaleString('en-GB') + '.pdf');
                document.body.appendChild(link);
                link.click();
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={classes.root}>
            <Container maxWidth='lg' >
                <div className={classes.option} >
                    <Button variant="contained" color="primary" onClick={handleDownloadClick} >
                        Download PDF
                    </Button>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel>Month</InputLabel>
                        <Select
                            value={month}
                            onChange={handleChangeMonth}
                            label="Month"
                        >
                            {monthList.map(month => <MenuItem key={month.name} value={month.index}>{month.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow className={classes.head}>
                                <TableCell />
                                <TableCell>รายการแจ้งซ่อม</TableCell>
                                <TableCell align="center">สถานที่</TableCell>
                                <TableCell align="right">วันที่แจ้ง</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.filter(job => new Date(job.pre_timestmp).getMonth()+1 === month && job)
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => <ReportsTable key={index} row={row} />)
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Container>
        </div>
    )
}

export default Reports
