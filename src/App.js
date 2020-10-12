import React from 'react';
import './App.css';
import  indigo from '@material-ui/core/colors/indigo'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { NavBar } from './components'
import ApiContentProvider from './context/ApiContextProvider'

const theme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: {
            main: "#f44336",
        },
    },
    typography: {
        fontFamily: '"Comic Neue", cursive'
    }
})

const App = () => {
    return (
        <ApiContentProvider>
            <MuiThemeProvider theme={theme}>
                <NavBar />
            </MuiThemeProvider>
        </ApiContentProvider>
    );
}

export default App;
