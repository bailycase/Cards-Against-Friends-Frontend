import { UtilActions } from './actions'

const { changeView } = UtilActions

export interface UtilState {
    isMobile: boolean;
}

interface ChangeViewAction {
    type: typeof changeView;
    payload: {
        isMobile: boolean
    }
}


export type UtilActionTypes = ChangeViewAction