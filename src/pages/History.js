import Axios from 'axios'
import React, { useEffect } from 'react'

function History() {

    
    const [image1, setImage1] = React.useState('')

    useEffect(() => {
        const formData = new FormData();
        formData.append("file", new File([""], "null"));

        Axios.post("http://localhost:4000/sendNullFile.php", formData)
            .then(res => {console.log(res);})

        Axios.get("http://localhost:4000/send.php").then(res => {console.log(res); setImage1(res.data?.[0].image)})
    }, [])
    return (
        <div>
            History
            <img src={image1} alt='' width='500px' />
        </div>
    )
}

export default History
