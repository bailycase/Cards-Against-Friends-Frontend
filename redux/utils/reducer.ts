import { UtilState, UtilActionTypes } from './types'
import { UtilActions } from './actions'

const initState: UtilState = {
    isMobile: false
}

const Utils = (state = initState, action: UtilActionTypes): UtilState => {
    switch (action.type) {
        case UtilActions.changeView:
            return { ...state, isMobile: action.payload.isMobile }
        default:
            return state;
    }
}

export default Utils