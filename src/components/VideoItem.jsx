import React, { useContext } from 'react'
import {
    makeStyles,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActionArea
} from '@material-ui/core'

import { ApiContext } from '../context/ApiContextProvider'

const useStyles = makeStyles(theme => ({
    card: {
        position: "relative",
        display: "flex",
        marginBottom: 15,
    },
    cardCont: {
        padding: theme.spacing(1),
    }
}))

const VideoItem = ({ video }) => {
    const classes = useStyles()
    const { setSelectedVideo } = useContext(ApiContext)

    return (
        <Card className={classes.card} onClick={() => setSelectedVideo(video)}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="thumbnail"
                    height="200"
                    image={video.thum}
                />
                <CardContent className={classes.cardCont}>
                    <Typography variant="h6">{video.title}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default VideoItem
