import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import blue from "@material-ui/core/colors/blue";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { withStyles } from "@material-ui/core/styles";


const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end"
    },
    input: {
        display: "none"
    },
    button: {
        color: blue[900],
        margin: 10
    },
});

class ImageUploadCard extends React.Component {
    state = {
        mainState: "initial", // initial, search, gallery, uploaded
        imageUploaded: 0,
        selectedFile: null
    };

    handleUploadClick = event => {
        var file = event.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            this.setState({
                selectedFile: [reader.result]
            });
            // this.props.onChange(reader.result);
        }.bind(this);
        console.log(url); // Would see a path?

        this.setState({
            mainState: "uploaded",
            selectedFile: event.target.files[0],
            imageUploaded: 1
        });
        this.props.onChange(event.target.files[0]);
    };


    renderInitialState() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <CardContent>
                    <Grid container justify="center" alignItems="center">
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={this.handleUploadClick}
                        />
                        <label htmlFor="contained-button-file">
                            <Fab component="span" className={classes.button}>
                                <AddPhotoAlternateIcon />
                            </Fab>
                        </label>
                    </Grid>
                </CardContent>
            </React.Fragment>
        );
    }

    renderUploadedState() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <CardActionArea onClick={this.imageResetHandler}>
                    <img
                        width="100%"
                        className={classes.media}
                        src={this.state.selectedFile}
                        alt=''
                    />
                </CardActionArea>
            </React.Fragment>
        );
    }

    imageResetHandler = () => {
        console.log("Click!");
        this.setState({
            mainState: "initial",
            selectedFile: null,
            imageUploaded: 0
        });
        this.props.onRemove();
    };

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <div className={classes.root}>
                    <Card className={this.props.cardName}>
                        {
                            (this.state.mainState === "initial" && this.renderInitialState()) ||
                            (this.state.mainState === "uploaded" && this.renderUploadedState())
                        }
                    </Card>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles, { withTheme: true })(ImageUploadCard);