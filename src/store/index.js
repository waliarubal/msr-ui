import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import rootEpic from './epics'
import rootReducer from './reducers'


let composeEnhancers = compose
let epicMiddleware = createEpicMiddleware()
let middleware = [epicMiddleware]

const createStoreWithMiddleware = composeEnhancers(applyMiddleware(...middleware))(createStore)
let store = createStoreWithMiddleware(rootReducer, {})
epicMiddleware.run(rootEpic)
export default store