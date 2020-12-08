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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Backdrop from '@material-ui/core/Backdrop';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { jobService } from '../services/jobService'
import { monthList } from '../constants/month';
import { authenticationService } from '../services/authenticationService';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(4),
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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        '& > *': {
            margin: theme.spacing(1),
        }
    },
}));

function Row(props) {

    const classes = useStyles();

    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [openPreImage, setOpenPreImage] = React.useState(false);

    const handlePreImageClose = () => {
        setOpenPreImage(false);
    };

    const handlePreImageToggle = () => {
        setOpenPreImage(!openPreImage);
    };

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
                                รายละเอียด
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
                                        {row.requester_name}
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
                                        หมายเลขรายการแจ้งซ่อม :
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
                                        {row.staff_name === null ? 'ยังไม่ถูกมอบหมาย' : row.staff_name}
                                    </Typography>
                                </Grid>

                                <Grid item md={10} xs={10} />
                                <Grid item md={2} xs={2} style={{textAlign: 'right'}} >
                                    <Button variant='contained' color='primary' onClick={handlePreImageToggle} >
                                        ดูรูปภาพ
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            <Backdrop className={classes.backdrop} open={openPreImage} onClick={handlePreImageClose}>
                <img src={row.pre_image_path} width='700' alt=""/>
                {
                    row.post_image_path !== '' &&
                    <img src={row.post_image_path} width='700' alt=""/>
                }
            </Backdrop>
        </React.Fragment>
    );
}

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
            .then(res => console.log(res))
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
                                    .map((row, index) => <Row key={index} row={row} />)
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
