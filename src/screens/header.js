import React from 'react';
import { TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { Button, Block, Input,NavBar, Text, theme, Button as GaButton ,Icon} from 'galio-framework';
import {setCategory, searchKeyWord,fetchMenus} from '../redux/actions/dataActions';
import store from '../redux/store/index';
import styles from '../assets/css/headerStyle';
import Tabs from './Tabs';  
import { connect } from 'react-redux';
 
const { height, width } = Dimensions.get('window');
const iPhoneX = () =>
  Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);


class Header extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            categories: [],
           
        }    
        
    }

     displayId = (id) => {
        store.dispatch(setCategory(id)) 
        this.props.fetchMenus()
    } 

    displaySearch = (text) => {
        store.dispatch(searchKeyWord(text))  
        this.props.fetchMenus() 
    }    

    async componentDidMount() {
        const settings = {
            method: 'GET', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.user.token}`
            }
        } 
        try{
            let response = await fetch('https://centrech.net/api/categories',settings)
            let json = await response.json() 
            this.setState({categories: json})  
            //console.log(json)  
        }
        catch(error){
            console.log(error)
        }
        
    }

    render(){
        return(
            <Block style={{ backgroundColor: "#e9e9e9"}}>

                <Block center >
                    <Input
                        right
                        color="black" 
                        style={styles.search}  
                        placeholder="Recherche..."
                        placeholderTextColor={'#8898AA'}
                        onChangeText = {(text) => this.displaySearch(text)}
                        iconContent={
                            <Icon size={16} color={theme.COLORS.MUTED} name="search1" family="antdesign" />
                        }
                    />

                    <Tabs
                        data={this.state.categories} 
                        menu={false}
                        initialIndex={null}
                        onChange={this.displayId}  
                    />

                </Block>

            </Block>
        );
    }
}

const mapStateToProps = state => {
    return {
        menus: state.menus,
        user: state.auth   
    }
}

export default connect(mapStateToProps,{setCategory,searchKeyWord,fetchMenus})(Header)






