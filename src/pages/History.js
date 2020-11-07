import Axios from 'axios'
import React, { useEffect } from 'react'

function History() {

    const [image, setImage] = React.useState('')
    const [image1, setImage1] = React.useState('')

    useEffect(() => {
        Axios.get("http://localhost:4000/sendImageResponse.php").then(res => {console.log(res); setImage(res.data)})

        Axios.get("http://localhost:4000/send.php").then(res => {console.log(res); setImage1(res.data?.[0].image)})
    }, [])
    return (
        <div>
            History
            <img src={image} alt='' width='500px' />
            <img src={image1} alt='' width='500px' />
        </div>
    )
}

export default History
