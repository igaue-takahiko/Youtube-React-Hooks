import React, { useContext } from 'react'
import { Grid } from '@material-ui/core';

import { ApiContext } from '../context/ApiContextProvider'
import { VideoItem } from './index'

const VideoList = () => {
    const { videos } = useContext(ApiContext)
    const listOfVideos = videos.map(video => (
        <VideoItem key={video.id} video={video} />
    ))

    return (
        <Grid container spacing={5}>
            <div className="video-list">{listOfVideos}</div>
        </Grid>
    )
}

export default VideoList
