import React, { useContext } from 'react'
import  Modal from 'react-modal'
import { Add } from '@material-ui/icons'
import {
    makeStyles,
    Grid,
    Container,
    Fab,
    Typography,
    TextField,
    IconButton,
} from '@material-ui/core'
import { IoMdClose } from 'react-icons/io'
import { RiUploadCloud2Line } from 'react-icons/ri'
import { FaVideo } from 'react-icons/fa'
import { BsImages } from 'react-icons/bs'

import { ApiContext } from '../context/ApiContextProvider'
import { VideoList, VideoDetail } from './index'

const useStyles = makeStyles(theme => ({
    container: {
        textAlign: "center",
    },
    grid: {
        justifyContent: "center"
    }
}))

const Main = () => {
    const classes = useStyles()
    Modal.setAppElement("#root")
    const {
        title,
        setTitle,
        video,
        setVideo,
        thum,
        setThum,
        modalIsOpen,
        setModalIsOpen,
        newVideo,
    } = useContext(ApiContext)

    const customStyles = {
        content: {
            top: "30%",
            left: "43%",
            right: "auto",
            bottom: "auto",
        }
    }

    const handleEditMovie = () => {
        const fileInput = document.getElementById("mp4Input")
        fileInput.click()
    }

    const handleEditPicture = () => {
        const fileInput = document.getElementById("imageInput")
        fileInput.click()
    }

    return (
        <div>
            <Grid container className={classes.grid}>
                <Grid item xs={11}>
                    <Grid container spacing={5}>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={1}>
                            <Fab
                                color="primary"
                                aria-label="add"
                                onClick={() => setModalIsOpen(true)}
                            >
                                <Add />
                            </Fab>
                        </Grid>
                        <Grid item xs={8}>
                            <VideoDetail />
                        </Grid>
                        <Grid item xs={3}>
                            <VideoList />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                onRequestClose={() => setModalIsOpen(false)}
            >
                <Typography>Movie title</Typography>
                <br/>
                <TextField
                    type="text"
                    onChange={event => setTitle(event.target.value)}
                />
                <br/>
                <br/>
                <Container className={classes.container}>
                    <input
                        type="file" id="mp4Input"
                        hidden="hidden" onChange={event => setVideo(event.target.files[0])}
                    />
                    <IconButton onClick={handleEditMovie}>
                        <FaVideo className="photo" />
                    </IconButton>
                    <input
                        type="file" id="imageInput"
                        hidden="hidden" onChange={event => setThum(event.target.files[0])}
                    />
                    <IconButton onClick={handleEditPicture}>
                        <BsImages className="photo" />
                    </IconButton>
                </Container>
                <br/>
                {title && video && thum && (
                    <button className="btn-modal" onClick={() => newVideo()}>
                        <RiUploadCloud2Line />
                    </button>
                )}
                <button className="btn-modal" onClick={() => setModalIsOpen(false)}>
                    <IoMdClose />
                </button>
            </Modal>
        </div>
    )
}

export default Main
