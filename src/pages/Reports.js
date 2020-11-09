import React, { useEffect } from 'react'
import { jobService } from '../services/jobService'

function Reports() {

    const [jobList, setJobList] = React.useState([]);

    useEffect(() => {
        jobService.getReports()
            .then(res => setJobList(res))
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            Reports page
            {jobList.map(job => <h1>{`${job.job_id} -> ${job.description} (${new Date(job.pre_timestmp).toUTCString()})`}</h1>)}
        </div>
    )
}

export default Reports
