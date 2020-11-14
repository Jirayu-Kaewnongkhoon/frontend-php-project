import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { jobService } from '../services/jobService'

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    tableRow: {
        '& > *': {
            borderBottom: 'unset',
            fontSize: 16
        },
    },
    head: {
        '& > *': {
            fontSize: 16,
        },
    },
}));

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.tableRow}>
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.description}
                </TableCell>
                <TableCell align="center">{row.building}</TableCell>
                <TableCell align="right">{new Date(row.pre_timestmp).toUTCString()}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1} >
                            <Typography gutterBottom component="div" style={{ textDecoration: 'underline' }}>
                                Detail
                            </Typography>
                            <Grid container>

                                <Grid item md={1} xs={1} />
                                <Grid item md={3} xs={5}>
                                    <Typography gutterBottom component="div">
                                        ผู้แจ้ง :
                                    </Typography>
                                </Grid>
                                <Grid item md={8} xs={6}>
                                    <Typography gutterBottom component="div">
                                        {row.requester_id}
                                    </Typography>
                                </Grid>

                                <Grid item md={1} xs={1} />
                                <Grid item md={3} xs={5}>
                                    <Typography gutterBottom component="div">
                                        สถานะ :
                                    </Typography>
                                </Grid>
                                <Grid item md={8} xs={6}>
                                    <Typography gutterBottom component="div">
                                        {row.job_status_name}
                                    </Typography>
                                </Grid>

                                <Grid item md={1} xs={1} />
                                <Grid item md={3} xs={5}>
                                    <Typography gutterBottom component="div">
                                        หมายเลขใบแจ้งซ่อม :
                                    </Typography>
                                </Grid>
                                <Grid item md={8} xs={6}>
                                    <Typography gutterBottom component="div">
                                        {row.job_id}
                                    </Typography>
                                </Grid>

                                <Grid item md={1} xs={1} />
                                <Grid item md={3} xs={5}>
                                    <Typography gutterBottom component="div">
                                        ช่างที่รับผิดชอบ :
                                    </Typography>
                                </Grid>
                                <Grid item md={8} xs={6}>
                                    <Typography gutterBottom component="div">
                                        {row.staff_id === null ? 'ยังไม่ถูกมอบหมาย' : row.staff_id}
                                    </Typography>
                                </Grid>

                            </Grid>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function Reports() {

    const classes = useStyles()

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([]);

    useEffect(() => {
        jobService.getReports()
            .then(res => setRows(res))
            .catch(err => console.log(err))
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDownloadClick = () => {
        jobService.getReportsPDF()
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <div className={classes.root}>
            Reports page
            <Container maxWidth='lg' >
                <Grid container >
                    <Grid item xs={8} />
                    <Grid item xs={4} style={{textAlign: 'right'}} >
                        <Button variant="contained" color="primary" onClick={handleDownloadClick} >
                            Download PDF
                        </Button>
                    </Grid>
                </Grid>
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
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <Row key={index} row={row} />
                            ))}
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
