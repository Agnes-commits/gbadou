import {FETCHING_ORDER_REQUEST,
    FETCHING_ORDER_SUCESS,
    FETCHING_ORDER_FAILURE,
    SET_TABLE_INFO,
    SET_ITEM,
    SET_ORDER_PRICE,
    REMOVE_ITEM

} from '../actions/types'

const initialState = {
    isLoading: false, 
    table_id: 1,
    total: 0,
    items: [],
    details:[],
    success: null,
    error: null
}

const orderReducer =  (state=initialState, action) => {

    switch(action.type) { 
        case FETCHING_ORDER_REQUEST:
            return {...state, isLoading:"true"}
        case FETCHING_ORDER_FAILURE: 
            return {...state, 
                isLoading:"false", 
                error:action.payload}
        case FETCHING_ORDER_SUCESS:
            return {...state, 
                isLoading:"false",
                success: action.payload,
            } 
        case SET_TABLE_INFO:
            return {...state, 
                table_id: action.payload,
                }
        case SET_ORDER_PRICE:
            return {...state, 
                total: action.payload}
        case SET_ITEM:
           
            return {...state,  
                items: state.items.concat(action.payload.item),
                details: state.details.concat(action.payload.detail)
            }
        
        case REMOVE_ITEM:
            
            return {...state,  
                items: action.payload.item,
                details: action.payload.detail
            }
        default:
            return state
    }
}

export default orderReducer