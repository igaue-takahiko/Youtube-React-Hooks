import React from 'react'
import { withCookies } from 'react-cookie'
import { makeStyles, AppBar, Toolbar, Typography } from '@material-ui/core'
import { FiLogOut } from 'react-icons/fi'
import { FaYoutube } from 'react-icons/fa'

const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
    }
}))

const NavBar = (props) => {
    const classes = useStyles()

    const Logout = () => {
        props.cookies.remove('jwt-token')
        window.location.href= '/'
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <button className="logo">
                    <FaYoutube />
                </button>
                <Typography variant="h5" className={classes.title}>Youtube</Typography>
                <button className="logout" onClick={() => Logout()}>
                    <FiLogOut />
                </button>
                <Typography variant="h6">Logout</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default withCookies(NavBar)
