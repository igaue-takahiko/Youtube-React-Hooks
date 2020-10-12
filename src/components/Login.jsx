import React, { useReducer } from 'react'
import { withCookies } from 'react-cookie'
import axios from 'axios'
import { LockOutlined } from '@material-ui/icons'
import {
    makeStyles,
    Avatar,
    Button,
    TextField,
    Typography,
    Container,
    CircularProgress
} from '@material-ui/core'

import {
    START_FETCH,
    FETCH_SUCCESS,
    ERROR_CATCH,
    INPUT_EDIT,
    TOGGLE_MODE
} from './actionTypes'

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3)
    },
    span: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'teal',
    },
    spanError: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'fuchsia',
        marginTop: 10,
    },
}))

const initialState = {
    isLoading: false,
    isLoginView: true,
    error: '',
    credentialsLog: {
        email: '',
        password: '',
    }
}

const loginReducer = (state, action) => {
    switch (action.type) {
        case START_FETCH: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case FETCH_SUCCESS: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case ERROR_CATCH: {
            return {
                ...state,
                error: "Email or password is not correct !",
                isLoading: false,
            }
        }
        case INPUT_EDIT: {
            return {
                ...state,
                [action.inputName]: action.payload,
                error: '',
            }
        }
        case TOGGLE_MODE: {
            return {
                ...state,
                isLoginView: !state.isLoginView,
            }
        }
        default:
            return state
    }
}



const Login = (props) => {
    const classes = useStyles()
    const [ state, dispatch ] = useReducer(loginReducer, initialState)

    const inputChangedLog = () => event => {
        const cred = state.credentialsLog
        cred[event.target.name] = event.target.value
        dispatch({
            type: INPUT_EDIT,
            inputName: 'state.credentialLog',
            payload: cred,
        })
    }

    const login = async event => {
        event.preventDefault()
        if (state.isLoginView) {
            try {
                dispatch({ type: START_FETCH })
                const res = await axios.post('http://127.0.0.1:8000/authen/jwt/create/', state.credentialsLog, {
                    headers: { 'Content-Type': 'application/json' }
                })
                props.cookies.set('jwt-token', res.data.access)
                res.data.access ? window.location.href = "/youtube" : window.location.href = "/"
                dispatch({ type: FETCH_SUCCESS })
            } catch {
                dispatch({ type: ERROR_CATCH })
            }
        } else {
            try {
                dispatch({ type: START_FETCH })
                await axios.post('http://127.0.0.1:8000/api/create/', state.credentialsLog, {
                    headers: { 'Content-Type': 'application/json' }
                })
                const res = await axios.post('http://127.0.0.1:8000/authen/jwt/create/', state.credentialsLog, {
                    headers: { 'Content-Type': 'application/json' }
                })
                props.cookies.set('jwt-token', res.data.access)
                res.data.access ? window.location.href = "/youtube" : window.location.href = "/"
                dispatch({ type: FETCH_SUCCESS })
            } catch {
                dispatch({ type: ERROR_CATCH })
            }
        }
    }

    const toggleView = () => {
        dispatch({ type: TOGGLE_MODE })
    }

    return (
        <Container maxWidth="xs">
            <form onSubmit={login}>
                <div className={classes.paper}>
                    {state.isLoading && <CircularProgress />}
                    <Avatar className={classes.avatar}>
                        <LockOutlined />
                    </Avatar>
                    <Typography variant="h5">
                        {state.isLoginView ? 'Login' : 'Register'}
                    </Typography>
                    <TextField
                        variant="outlined" margin="normal" fullWidth label="Email" name="email"
                        autoFocus value={state.credentialsLog.email} onChange={inputChangedLog()}
                    />
                    <TextField
                        variant="outlined" margin="normal" fullWidth label="Password" name="password"
                        value={state.credentialsLog.password} type="password" onChange={inputChangedLog()}
                    />
                    <span className={classes.spanError}>{state.error}</span>
                    {state.isLoginView ?
                        !state.credentialsLog.password || !state.credentialsLog.email ?
                        <Button
                            className={classes.submit} type="submit" fullWidth disabled
                            variant="contained" color="primary"
                        >Login</Button>
                        : <Button
                            className={classes.submit} type="submit" fullWidth
                            variant="contained" color="primary"
                        >Login</Button>
                        :
                        !state.credentialsLog.password || state.credentialsLog.email ?
                        <Button
                            className={classes.submit} type="submit" fullWidth disabled
                            variant="contained" color="primary"
                        >Register</Button>
                        : <Button
                            className={classes.submit} type="submit" fullWidth
                            variant="contained" color="primary"
                        >Register</Button>
                    }
                    <span className={classes.span} onClick={() => toggleView()}>
                        {state.isLoginView ? 'Create Account' : 'Back to login'}
                    </span>
                </div>
            </form>
        </Container>
    )
}

export default withCookies(Login)
