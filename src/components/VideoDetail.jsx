import React, { useContext } from 'react'
import  ReactPlayer from 'react-player'
import { Delete } from '@material-ui/icons'
import {
    makeStyles,
    Grid,
    Typography,
    Fab,
} from '@material-ui/core';
import { AiFillLike, AiFillDislike } from 'react-icons/ai'
import { IoLogoYoutube } from 'react-icons/io'

import { ApiContext } from '../context/ApiContextProvider'

const useStyles = makeStyles(theme => ({
    title: {
        paddingLeft: theme.spacing(2),
    },
    delete: {
        margin: theme.spacing(2),
    },
    like: {
        paddingTop: theme.spacing(3)
    }
}))

const VideoDetail = () => {
    const classes = useStyles()
    const {
        selectedVideo,
        deleteVideo,
        incrementLike,
        incrementDislike,
    } = useContext(ApiContext)

    if (!selectedVideo) {
        return (
            <div className="container">
                <button className="wait">
                    <IoLogoYoutube />
                </button>
            </div>
        )
    }

    return (
        <div>
            <div className="wrapper">
                <ReactPlayer
                    className="player"
                    width="100%"
                    height="100%"
                    url={selectedVideo.video}
                    playing
                    controls
                    disablePictureInPicture
                    config={{
                        file: {
                            attributes: {
                                controlsList: "nodownload",
                                disablePictureInPicture: true,
                            }
                        }
                    }}
                />
            </div>
            <Grid container alignItems="center">
                <Grid item xs={10}>
                    <Typography className={classes.title} variant="h6">
                        {selectedVideo.title}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <button className="like" onClick={() => incrementLike()}>
                        <AiFillLike />
                        <Typography>{selectedVideo.like}</Typography>
                    </button>
                </Grid>
                <Grid item xs={1}>
                    <button className="like" onClick={() => incrementDislike()}>
                        <AiFillDislike />
                        <Typography>{selectedVideo.dislike}</Typography>
                    </button>
                </Grid>
            </Grid>
            <Fab
                className={classes.delete}
                color="primary"
                aria-label="delete"
                onClick={() => deleteVideo()}
            >
                <Delete />
            </Fab>
        </div>
    )
}

export default VideoDetail
