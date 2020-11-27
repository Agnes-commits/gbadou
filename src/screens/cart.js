import React from 'react';
import { theme,Input, Block,Button,Text, Icon } from 'galio-framework';
import { View,ScrollView ,FlatList, Platform} from 'react-native';
import Header from './header';
import { Card } from 'react-native-elements'
import styles from '../assets/css/menuStyle';
import { removeOrder,setOrderPrice,sendOrder } from '../redux/actions/dataActions';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
//import { TouchableOpacity } from 'react-native-gesture-handler';

const Item = (props) => {
    const {item,remove} = props
    let v,e;
    if(item.variants){
      v= <Text>{item.variants && "Options:"}  {item.variants && item.variants}</Text>
    }
    if(item.extras){
      e = <Text>{item.extras && "Suppléments:"} {item.extras && item.extras} </Text>
    }
    return( 
        <Card flex={1}  containerStyle={{borderWidth:0,marginHorizontal:2,borderRadius:5}} key={item.id}>
                <Card.Title>{item.menu}</Card.Title>
                <Card.Divider/>
                    {v}
                    {e}
                <Text> 
                  Quantité: {item.quantity}
                </Text>
                <Text>
                  Prix: {item.price}
                </Text>
           
            <Block right>
                <TouchableOpacity onPress={()=>{remove(item.id,item.price)}}>
                  <Text style={{color:"red"}}>Supprimer</Text>
                </TouchableOpacity>
            </Block>
        </Card>
    )
}
 
 
class CartScreen extends React.Component{
  constructor(props) {
    super(props)

    this.removeItem = this.removeItem.bind(this);
    
  }

  removeItem(id,price) {
    let item,detail;

    item = this.props.order.items.filter(ex => ex.variand_id !== id)
    detail = this.props.order.details.filter(ex => ex.variand_id !== id)
    
    this.props.removeOrder({item:item,detail:detail}); 
    this.props.setOrderPrice(this.props.order.total-parseFloat(price))
  }  

  commande = () => {
    alert('ok')
    this.props.sendOrder()
  }

  

  render() { 
    return (
        <Block style={[styles.container]}> 
            <Block style={{backgroundColor: "#ffa800", borderRadius:10, elevation:2,margin: 10,}}>
                <Block center>
                   <Text h5 style={{color: "#fff", alignSelf:"center",padding: 5,}}>
                     Total:   {this.props.order.total}
                   </Text>
                </Block>
            </Block>
            <Block style={styles.cardContainer}>
                <FlatList
                        data={this.props.order.details} 
                        renderItem={({item}) =>  <Item  item={item} remove={this.removeItem}/>}
                        keyExtractor={item => item.id.toString()} 
                        showsVerticalScrollIndicator={false}  
                    />    
            </Block> 
            <Block style={{marginHorizontal:5}}> 
              <Button onlyIcon 
                    icon="wallet" 
                    iconFamily="antdesign" 
                    iconSize={35} 
                    color="warning" 
                    iconColor="#fff" 
                    onPress={()=>{this.commande()}}
                    style={{ 
                      width: 50, 
                      height: 50,
                      margin: 10,
                      alignSelf:"flex-end",
                      zIndex:13, 
                      bottom:1,
                      position:"absolute",
                      elevation:5 }}>Commander</Button>
            </Block>
          </Block>
    );
  }
}

const mapStateToProps = state => {
  
  return {
      order: state.order,
  }
} 

export default connect(mapStateToProps,{removeOrder,setOrderPrice,sendOrder})(CartScreen)
