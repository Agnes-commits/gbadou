import {FETCHING_LOGIN_REQUEST,
        FETCHING_LOGIN_SUCESS,
        FETCHING_LOGIN_FAILURE,
        LOGOUT, 
        REGISTER,
        REGISTER_DATA_SENDING, 
    
} from '../actions/types'

const initialState = {
    isLoading: "true",
    errorMessage: null,
    token: null,
    userInfo: {},
    user: null
}

const authReducer =  (state=initialState, action) => {
 
        switch(action.type) { 
            case REGISTER:
                return {...state, 
                    isLoading:true, 
                    userInfo:{...state.userInfo,...action.payload.info}} 
            case REGISTER_DATA_SENDING:
                return {...state, 
                    isLoading:"false",
                    token:action.payload.accessToken, 
                    user: action.payload.user,
                }
            case FETCHING_LOGIN_REQUEST:
                return {...state, isLoading:"true"}
            case FETCHING_LOGIN_FAILURE:
                return {...state, 
                    isLoading:"false", 
                    errorMessage:action.payload}
            case FETCHING_LOGIN_SUCESS:
                return {...state, 
                    isLoading:"false",
                    token:action.payload.accessToken,
                    info: action.payload.user,
                } 
            case LOGOUT:
                    return {
                        isLoading: "true",
                        errorMessage: "",
                        token: null,
                        userInfo: {},
                        user: null
                    }   

            default:
                return state
        }
}

export default authReducer