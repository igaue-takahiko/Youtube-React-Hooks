import React from 'react'
import { makeStyles, AppBar, Toolbar, Typography } from '@material-ui/core'
import { FiLogOut } from 'react-icons/fi'
import { FaYoutube } from 'react-icons/fa'

const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
    }
}))

const NavBar = () => {
    const classes = useStyles()

    return (
        <AppBar position="static">
            <Toolbar>
                <button className="logo">
                    <FaYoutube />
                </button>
                <Typography variant="h5" className={classes.title}>Youtube</Typography>
                <button className="logout" onClick>
                    <FiLogOut />
                </button>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
