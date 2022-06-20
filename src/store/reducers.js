import { combineReducers } from 'redux'
import login from '../state/login'
import home from '../state/home'

export default combineReducers({
    login,
    home
})