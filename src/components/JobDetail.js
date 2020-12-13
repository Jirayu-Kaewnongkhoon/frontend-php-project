import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import InfoIcon from '@material-ui/icons/Info';
import ImageIcon from '@material-ui/icons/Image';
import AssignmentIcon from '@material-ui/icons/Assignment';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ScheduleIcon from '@material-ui/icons/Schedule';

const useStyles = makeStyles((theme) => ({
    contentHeader: {
        fontSize: 18, 
        textDecoration: 'underline', 
        display: 'flex', 
        marginBottom: 20
    },
    content: {
        display: 'flex',
        justifyContent: 'center'
    },
    section: {
        marginTop: '30px', 
        marginBottom: '30px'
    },
}));

function JobDetail(props) {

    const { job } = props;
    const classes = useStyles();

    return (
        <div>
            <div className={classes.section}>

                <div style={{ display: 'flex', marginBottom: 20 }} >
                    <AssignmentIcon color='primary' />
                    <Grid container>
                        <Grid item md={3} xs={3}>
                            <Typography style={{ fontSize: 18 }}>รายการแจ้งซ่อมหมายเลข:</Typography>
                        </Grid>
                        <Grid item md={9} xs={9}>
                            <Typography style={{ fontSize: 18 }}>{job.job_id}</Typography>
                        </Grid>
                    </Grid>
                </div>

                <div style={{ display: 'flex', marginBottom: 20 }} >
                    <ScheduleIcon color='primary' />
                    <Grid container>
                        <Grid item md={3} xs={3}>
                            <Typography style={{ fontSize: 18 }}>วันที่แจ้ง:</Typography>
                        </Grid>
                        <Grid item md={9} xs={9}>
                            <Typography style={{ display: 'flex', fontSize: 18 }} >
                                {new Date(job.pre_timestmp).toLocaleString('en-GB')}
                            </Typography>
                        </Grid>
                    </Grid>
                </div>

                <div style={{ display: 'flex', marginBottom: 20 }} >
                    <FiberManualRecordIcon color='primary' />
                    <Grid container>
                        <Grid item md={3} xs={3}>
                            <Typography style={{ fontSize: 18 }}>สถานะ:</Typography>
                        </Grid>
                        <Grid item md={9} xs={9}>
                            <Typography style={{ display: 'flex', fontSize: 18 }} >
                                <FiberManualRecordIcon style={{ color: '#FFCD33' }} />
                                {job.job_status_name}
                            </Typography>
                        </Grid>
                    </Grid>
                </div>

            </div>

            <Divider />

            <div className={classes.section}>
                <Typography variant='h6' className={classes.contentHeader} >
                    <InfoIcon color='primary' />
                    Information
                </Typography>
                <Grid container>
                    <Grid item md={2} xs={2} />
                    <Grid item md={3} xs={3}>
                        <Typography>สถานที่:</Typography>
                    </Grid>
                    <Grid item md={7} xs={7}>
                        <Typography>{job.building}</Typography>
                    </Grid>

                    <Grid item md={2} xs={2} />
                    <Grid item md={3} xs={3}>
                        <Typography>ชั้น:</Typography>
                    </Grid>
                    <Grid item md={7} xs={7}>
                        <Typography>{job.floor}</Typography>
                    </Grid>

                    <Grid item md={2} xs={2} />
                    <Grid item md={3} xs={3}>
                        <Typography>ห้อง:</Typography>
                    </Grid>
                    <Grid item md={7} xs={7}>
                        <Typography>{job.room}</Typography>
                    </Grid>

                    <Grid item md={2} xs={2} />
                    <Grid item md={3} xs={3}>
                        <Typography>รายละเอียด:</Typography>
                    </Grid>
                    <Grid item md={7} xs={7}>
                        <Typography>{job.description}</Typography>
                    </Grid>
                </Grid>
            </div>

            <Divider />

            <div className={classes.section}>
                <Typography variant='h6' className={classes.contentHeader} >
                    <ImageIcon color='primary' />
                    Images
                </Typography>
                <div className={classes.content}>
                    <img src={job.pre_image_path} alt='' width='450px' />
                </div>
            </div>
            
        </div>
    )
}

export default JobDetail
