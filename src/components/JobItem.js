import React from 'react'

function JobItem(props) {
    return (
        <div>
            {`Job Desc : ${props.data.description}`}
            <img 
                src={props.data.pre_image_path} 
                alt='' 
                width="500px" />
        </div>
    )
}

export default JobItem
