
import { combineReducers } from 'redux'

import authReducer from './authReducer'
import menuReducer from './menuReducer'
import orderReducer from './orderReducer'



const rootReducer = combineReducers({
   
    auth: authReducer,
    menus: menuReducer,
    order: orderReducer    
   
})

export default rootReducer