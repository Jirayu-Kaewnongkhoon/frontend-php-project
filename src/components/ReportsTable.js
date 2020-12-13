import React from 'react'
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


const useStyles = makeStyles((theme) => ({
    tableRow: {
        '& > *': {
            borderBottom: 'unset',
            fontSize: 16
        },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        '& > *': {
            margin: theme.spacing(1),
        }
    },
}));

function ReportsTable(props) {
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
                <TableCell align="right">{new Date(row.pre_timestmp).toLocaleString('en-GB')}</TableCell>
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

                                {
                                    row.post_timestmp !== '' &&
                                    <Grid container>
                                        <Grid item md={1} xs={1} />
                                        <Grid item md={3} xs={5}>
                                            <Typography gutterBottom component="div">
                                                วันที่ซ่อมเสร็จสิ้น :
                                            </Typography>
                                        </Grid>
                                        <Grid item md={8} xs={6}>
                                            <Typography gutterBottom component="div">
                                                {new Date(row.post_timestmp).toLocaleString('en-GB')}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                }

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

export default ReportsTable
