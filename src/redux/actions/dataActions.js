import {
        FETCHING_LOGIN_REQUEST,
        FETCHING_LOGIN_SUCESS,
        FETCHING_LOGIN_FAILURE,
        REGISTER,
        REGISTER_DATA_SENDING,
        LOGOUT,
        SEARCH_KEY_WORD,
        SET_CATEGORY,
        FETCHING_MENUS_REQUEST,
        FETCHING_MENUS_SUCESS,
        FETCHING_MENUS_FAILURE,
        FETCHING_ORDER_REQUEST,
        FETCHING_ORDER_SUCESS,
        FETCHING_ORDER_FAILURE,
        SET_TABLE_INFO,
        SET_ITEM,
        SET_ORDER_PRICE,
        REMOVE_ITEM
        
} from './types'
import store from '../store/index'
import AsyncStorage from '@react-native-community/async-storage';




export const register = ({token,info}) => ({type:REGISTER, payload:{token,info}})

export const registerDataSending = json => ({type: REGISTER_DATA_SENDING, payload:json})

export const sendRegisterData = () => { 
    const settings = {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
       
        body: JSON.stringify(
            store.getState().auth.userInfo  
        )
    
        }
    return async dispatch => {
        
        try{
            let response = await fetch('https://centrech.net/api/register',settings)
            let json = await response.json()
            console.log(json)
            if(response.ok){
            dispatch(registerDataSending(json))
            }
            else{
                console.log(json)
            }
            
            storeData(json)
        }
        catch(error){
            console.log(error)
        }
    }
}


const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
    }
}

const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
}

const  removeValue = async () => {
    try {
      await AsyncStorage.removeItem('@storage_Key')
    } catch(e) {
      // remove error
    }
  
    console.log('Done.')
}

export const fetchingLoginRequest = () => ({type: FETCHING_LOGIN_REQUEST})

export const fetchingLoginSucess = json => ({type: FETCHING_LOGIN_SUCESS, payload:json})

export const fetchingLoginFailure = error => ({type: FETCHING_LOGIN_FAILURE, payload:error})

export const logout = () => ({type: LOGOUT})

export const searchToken = ({token,info}) => ({type: SEARCH_TOKEN, payload:{token,info}})

export const fetchLogin = (values) => { 
    const settings = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
       
        body: JSON.stringify(
            values
        )
    
        }
    return async dispatch => {
        dispatch(fetchingLoginRequest());
        try{
            let response = await fetch('https://centrech.net/api/login',settings)
            let json = await response.json()
            
            if (response.ok) {
                dispatch(fetchingLoginSucess(json))
                storeData(json) 
            }else{
                
                dispatch(fetchingLoginFailure(json.password[0]))
            }
        }
        catch(error){
            console.log(error)
        }
    }
}
 
export const setLogout =  () => {
   return async dispatch => {
    try {
        await AsyncStorage.removeItem('@storage_Key')
        dispatch(logout())
      } catch(e) {
        console.log(e)
      }
   }
}

export const setSearchToken = () => {
    return async dispatch =>  {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
          
            if(jsonValue != null) {
                dispatch(fetchingLoginSucess(JSON.parse(jsonValue)))
            }

        } catch(e) {
                console.log(e) 
          }
    }
    
}

export const deleteCache = () => ({type:DELETE_CACHE})

export const setCategory = id => ({type: SET_CATEGORY, payload:id})

export const searchKeyWord = text => ({type: SEARCH_KEY_WORD, payload:text})

export const fetchingMenusRequest = () => ({type: FETCHING_MENUS_REQUEST})

export const fetchingMenusSucess = json => ({type: FETCHING_MENUS_SUCESS, payload:json})

export const fetchingMenusFailure = error => ({type: FETCHING_MENUS_FAILURE, payload:error})

export const fetchMenus = () =>{
    let url;
    let settings;

    if(store.getState().menus.category==null && store.getState().menus.keyword==""){
        url = 'https://centrech.net/api/menus';
        settings = {
            method: 'GET', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${store.getState().auth.token}`
            }
        }
    }
    else{
        if(store.getState().menus.keyword!=""){
            const keyword = {search: store.getState().menus.keyword}
            //console.log(keyword)
            url = `https://centrech.net/api/menu/search`
            settings = {
                method: 'POST', 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${store.getState().auth.token}`
                },
                body: JSON.stringify(
                    keyword  
                )
            }
        }
        else if(store.getState().menus.category!=null){
            const cat = {category_id: store.getState().menus.category}
            url = `https://centrech.net/api/cat/menu`
            settings = {
                method: 'POST', 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${store.getState().auth.token}`
                },
                body: JSON.stringify(
                    cat  
                )
            }
        } 
    }

    return async dispatch => {
        dispatch(fetchingMenusRequest());
        try{
            let response = await fetch(url,settings)
            let json = await response.json()
            
            dispatch(fetchingMenusSucess(json))
            console.log(json)  
            const cat=null, key="";
            dispatch(searchKeyWord(key))
            dispatch(setCategory(cat))
        }
        catch(error){
            dispatch(fetchingMenusFailure(error))
        }
    }
}

export const setTableInfo = id => ({type:SET_TABLE_INFO, payload:id})

export const setOrderPrice = price => ({type:SET_ORDER_PRICE, payload:price})

export const setItem = ({item,detail}) => ({type:SET_ITEM, payload:{item,detail}})

export const removeOrder = ({item,detail}) => ({type:REMOVE_ITEM, payload:{item,detail}})

export const fetchingOrderRequest = () => ({type: FETCHING_ORDER_REQUEST})

export const fetchingOrderSucess = sucess => ({type: FETCHING_ORDER_SUCESS, payload:sucess})

export const fetchingOrderFailure = error => ({type: FETCHING_ORDER_FAILURE, payload:error})

export const sendOrder = () => {
    const settings = {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.getState().auth.token}`
        },
       
        body: JSON.stringify(
            {
                table_id: store.getState().order.table_id,
                commande: store.getState().order.items
            }  
        )
    
        }
    return async dispatch => {
        
        try{
            let response = await fetch('https://centrech.net/api/menu/order',settings)
            let json = await response.json()
            console.log(json)
            if (response.ok) {
               const success = "Commande envoyé avec succès"
               dispatch(fetchingOrderSucess(success))
            }
            else{
                //const success = "Success"
               dispatch(fetchingOrderFailure(json))
            }
           
        }
        catch(error){
            console.log(error)
        }
    }
}