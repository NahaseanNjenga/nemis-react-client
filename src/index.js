import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import Router from './routes'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import {setSchoolAdminAuthorizationToken, setSystemAdminAuthorizationToken} from './utils/setAuthorizationToken'
import {setCurrentUser} from './actions/loginActions'
import jwt from 'jsonwebtoken'

const store=createStore(rootReducer,compose(applyMiddleware(thunk),window.devToolsExtension?window.devToolsExtension():f=>f))

if(localStorage.systemAdminJwtToken){
    setSystemAdminAuthorizationToken(localStorage.systemAdminJwtToken)
    store.dispatch(setCurrentUser(jwt.decode(localStorage.systemAdminJwtToken)))
}
if(localStorage.schoolAdminJwtToken){
    setSchoolAdminAuthorizationToken(localStorage.schoolAdminJwtToken)
    store.dispatch(setCurrentUser(jwt.decode(localStorage.schoolAdminJwtToken)))
}

ReactDOM.render(<Provider store={store}>
    <Router/>
</Provider>,document.getElementById('root'))