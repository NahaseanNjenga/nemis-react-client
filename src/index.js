import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import Router from './routes'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import setAuthorizationToken from './utils/setAuthorizationToken'
import {setCurrentUser} from './actions/loginActions'
import jwt from 'jsonwebtoken'

const store=createStore(rootReducer,compose(applyMiddleware(thunk),window.devToolsExtension?window.devToolsExtension():f=>f))

if(localStorage.jwtToken){
    setAuthorizationToken(localStorage.jwtToken)
    store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)))
}

ReactDOM.render(<Provider store={store}>
    <Router/>
</Provider>,document.getElementById('root'))