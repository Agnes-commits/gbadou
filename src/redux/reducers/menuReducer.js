import {FETCHING_MENUS_REQUEST,
    FETCHING_MENUS_SUCESS,
    FETCHING_MENUS_FAILURE,
    SET_CATEGORY,
    SEARCH_KEY_WORD
   

} from '../actions/types'

const initialState = {
    isLoading: false, 
    keyword: "",
    menus: [],
    category: null 
}

const menuReducer =  (state=initialState, action) => {

    switch(action.type) { 
        case FETCHING_MENUS_REQUEST:
            return {...state, isLoading:"true"}
        case FETCHING_MENUS_FAILURE:
            return {...state, 
                isLoading:"false", 
                errorMessage:action.payload}
        case FETCHING_MENUS_SUCESS:
            return {...state, 
                isLoading:"false",
                menus: action.payload,
            } 
        case SET_CATEGORY:
            return {...state, 
                category: action.payload}
        case SEARCH_KEY_WORD:
            return {...state, 
                keyword: action.payload}

        default:
            return state
    }
}

export default menuReducer