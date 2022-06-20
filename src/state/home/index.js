import { switchMap, catchError, map } from 'rxjs/operators'
import { of, from } from 'rxjs'
import { ofType } from 'redux-observable'

// Action-type 
export const INIT_LOAD = 'INIT_LOAD'
export const APP_LOADED = 'LOADED'

//Actions

export const initLoadData = () => ({ type: INIT_LOAD })
export const appLoaded = payload => ({ type: APP_LOADED, payload })

export const epics = {
    initLoadData: (action$, state$) => action$.pipe(
        ofType(INIT_LOAD),
        switchMap(({ type, payload }) => {
            return of(appLoaded('test'))
        })
    )
}
export const initialState = {

}

// REDUCERS
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case APP_LOADED:
            return {
                ...state,
                loadData: action.payload
            }
        default:
            return state
    }
}
export const getInitData = state => state.home.loadData