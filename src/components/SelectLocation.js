import React, { useEffect } from 'react';
import { buildingList } from '../constants/buildingList'
import { jobService } from '../services/jobService';

function SelectLocation(props) {

    const canvasRef = React.createRef();
    const [canvas, setCanvas] = React.useState(document.getElementById("canvas"));
    const [locationImage, setLocationImage] = React.useState('');
    const [color, setColor] = React.useState('')

    useEffect(() => {
        setCanvas(canvasRef.current);
        
        const getElementPosition = (obj) => {
            var curleft = 0, curtop = 0;
            if (obj.offsetParent) {
                do {
                    curleft += obj.offsetLeft;
                    curtop += obj.offsetTop;
                } while (obj === obj.offsetParent);
                return { x: curleft, y: curtop };
            }
            return undefined;
        }
    
        const getEventLocation = (element, event) => {
            var pos = getElementPosition(element);

            return {
                x: (event.pageX - pos.x),
                y: (event.pageY - pos.y)
            };
        }

        const rgbToHex = (r, g, b) => {
            if (r > 255 || g > 255 || b > 255)
                throw new Error("Invalid color component");
            return ((r << 16) | (g << 8) | b).toString(16);
        }

        const drawImageFromWebUrl = (sourceurl) => {
            var img = new Image();

            img.addEventListener("load", function () {
                // The image can be drawn from any source
                canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);

            });

            img.setAttribute("src", sourceurl);
        }

        const setUp = () => {

            drawImageFromWebUrl(locationImage);
            
            if (canvas) {
                canvas.addEventListener("mousemove", function (e) {
                    var eventLocation = getEventLocation(this, e);

                    // Get the data of the pixel according to the location generate by the getEventLocation function
                    var context = this.getContext('2d');
                    var pixelData = context.getImageData(eventLocation.x, eventLocation.y, 1, 1).data;

                    var hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
                    // console.log(hex);
                    setColor(hex)

                }, false);
            }
        }

        jobService.getLocationImage()
            .then(res => {
                setLocationImage(res?.[0].locationImage);
                setUp();
            })

    }, [canvasRef, canvas, locationImage])

    return (
        <div>
            <h3 style={{textAlign: 'center'}}>SelectLocation</h3>
            <canvas
                id="canvas"
                width="900"
                height="650"
                ref={canvasRef}
                onClick={() => {
                    // console.log(color);
                    buildingList.forEach(element => {
                        if (element.color === color) {
                            props.onChange(element.buildingName);
                        }
                    });
                }}
            >
            </canvas>
        </div>
    )
}

export default SelectLocation
