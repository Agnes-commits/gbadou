import React from 'react';
import { connect } from 'react-redux';
import {setItem,setOrderPrice,removeOrder} from '../redux/actions/dataActions';
import { FlatList,Modal, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, Dimensions, View } from 'react-native';
import { Block, Text, theme, Button, Icon,Checkbox   } from 'galio-framework';
import styles from '../assets/css/detailStyle';
import { Overlay } from 'react-native-elements';
import Tabs from './Tabs'; 
import { SimpleStepper } from 'react-native-simple-stepper';


const { width } = Dimensions.get('screen');



const Item = (props) => { 
    const {item,onSelected} = props
    const name = item.name + " ("+ item.prix_vente + ")"
    return(
        <View key={item.id} style={{paddingRight:10,marginVertical:5}}>
            <Checkbox  
                color="#ffa800"
                label={name}  
                onChange = {()=>onSelected(item.id,item.prix_vente,item.name)}
                initialValue={false} />
        </View>
    )
} 

class DetailScreen extends React.Component {
    constructor(props) { 
        super(props)
        this.state = {
            modalVisible: false,
            menuData: [],
            hasVariante: false,
            hasExtra: false,
            value: 1,
            prix:null,
            taille: 0.36,
            total: null,
            variant_id : null,
            prix_variant: null,
            extras: []
           
        }
        this.setModalVisible = this.setModalVisible.bind(this);
    }

    setModalVisible = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    }

    valueChanged(value) {
        // Truncate value to 2 decimal places and cast as Number.
        const nextValue = Number(value.toFixed(2));
        this.setState({ value: nextValue }, ()=> this.newPrice());
        if(nextValue<10){
            this.setState({ taille: 0.36 });
        }
        if(nextValue==10 || (nextValue>10 && nextValue<100)){
            this.setState({ taille: 0.39 });
        }
        if(nextValue==100){
            this.setState({ taille: 0.43 });
        }
    }

    newPrice = () =>{
        
        let price = 0.0;
        this.state.extras.forEach(ex=>{
            price = price + parseFloat(ex.price)
        }) 
       
        if(this.state.prix_variant!=null){
            price = this.state.value*(price + parseFloat(this.state.prix_variant))
            
        }else{
            const menu = this.props.menus.menus.find(menu => menu.id == this.props.route.params.id)
            price = this.state.value*(price + parseFloat(menu.prix_vente));
            
        }
        

        this.setState({ prix: price },()=>console.log(this.state.prix));
    }

    selectedVariantId = (id) => {
        this.setState({ variant_id: id },()=>console.log(this.state.variant_id));
        
    }

    selectedVariantPrice = (price) => {
        this.setState({ prix_variant: price },()=>this.newPrice()); 
        
    }

    onSelectedExtraChange = (id,price,name) => {
        //console.log(id,price)
        if(this.state.extras.length==0){
            const ex = { id: id, price: price,name:name}
            this.setState({
                extras: this.state.extras.concat(ex)
            }, () => this.newPrice())
        }
        else{
            if(this.state.extras.find(ex => ex.id == id)==undefined){
                const ex = { id: id, price: price,name:name}
                this.setState({
                    extras: this.state.extras.concat(ex)
                }, () => this.newPrice())
            }
            else{
                this.setState({
                    extras: this.state.extras.filter(ex => ex.id !== id)
                }, () => this.newPrice())
            }
        }
        
    } 

    yes = () => {
        this.setModalVisible()
        this.props.navigation.navigate('Menu')
    }

    no = () => {
        this.setModalVisible()
        this.props.navigation.navigate('Cart')
    }
    addToCart = () => {
        
        const menu = this.props.menus.menus.find(menu => menu.id == this.props.route.params.id)

        let extras = [], extras_name = "",prix;

        this.state.extras.forEach(ex =>{
            extras.push(parseInt(ex.id))
            extras_name= ex.name+ ", " +extras_name   
        })

        if(this.state.prix){
            prix = this.state.prix
        } else{
            prix = this.state.value*menu.prix_vente 
        }

        const item = {
            variant_id: this.state.variant_id,
            extra: extras,
            quantity: this.state.value,
            price: prix,
            menu_id: menu.id
        }
 
        let variants = ""
        this.state.menuData.variants && this.state.menuData.variants.forEach(v => {
            if(v.id == this.state.variant_id){
                if(v.attribut_value.length==2){
                    variants = v.attribut_value[0] + ", " + v.attribut_value[1]}
                else {variants = v.attribut_value[0]}
            }
        })
        const detail = {
            menu: menu.name.charAt(0).toUpperCase() + menu.name.slice(1),
            variants : variants,
            extras: extras_name,
            quantity: this.state.value,
            price: prix,
            id: menu.id,
            variant_id:this.state.variant_id
        }
       
        this.props.setItem({item:item,detail:detail}) 
        this.props.setOrderPrice(this.props.order.total + prix)
        this.setModalVisible()
    }

    async componentDidMount() {
        const settings = {
            method: 'GET', 
            headers: {
                'Accept': 'application/json',
                'extras-Type': 'application/json',
                'Authorization': `Bearer ${this.props.user.token}`
            }
        }
        try{
            let response = await fetch(`https://centrech.net/api/${this.props.route.params.id}/menu`,settings) 
            let json = await response.json() 
            
            this.setState({menuData: json.data}) 
            console.log(json.data)

            if(json.data.extras && json.data.extras.length > 0){
                this.setState({hasExtra: true}) 
            } 
            if(json.data.variants && json.data.variants.length > 0){
                this.setState({hasVariante: true}) 
            }   
        }
        catch(error){
            console.log(error)
        }

        
        
    }

    render(){
        const menu = this.props.menus.menus.find(menu => menu.id == this.props.route.params.id)

        let extras,variante;
        if(this.state.hasExtra){
            extras = <Block style={{ padding: 10,flex: 1,}}>
                        <Text size={16}
                                muted
                                style={{
                                textAlign: 'justify',
                                lineHeight: 25,
                                color: 'black',
                                paddingBottom:3
                                }}> Suppléments </Text>
                    
                                <Block style={{width: width-40,
                                            marginRight: 10,
                                            marginLeft:5,
                                            zIndex: 2,}}>
                                    <FlatList 
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        data={this.state.menuData.extras} 
                                        renderItem={({item}) =>  <Item item={item} onSelected={this.onSelectedExtraChange}/>}
                                        keyExtractor={item => item.name} 
                                        showsVerticalScrollIndicator={false}  
                                    /> 
                                </Block>  
                            </Block>
        } 

        if(this.state.hasVariante){
            variante = <Block style={{ padding: 10}}>
                            <Text size={16}
                                    muted
                                    style={{
                                    textAlign: 'justify',
                                    zIndex: 2,
                                    lineHeight: 25,
                                    color: 'black',
                                    paddingBottom:3
                                    }}> Options
                                   </Text> 
                                <Tabs  
                                    data={this.state.menuData.variants}  
                                    initialIndex={null}
                                    menu={true} 
                                    onChange={this.selectedVariantId}
                                    price = {this.selectedVariantPrice} 
                                /> 
                            </Block>
        }

        return(
            <ScrollView style={{
                backgroundColor: "#e9e9e9", 
                marginBottom:20
               }} >
                <View style={{
                    backgroundColor: "#e9e9e9",
                    flex: 1,
                   
                }} >

                <Overlay overlayStyle={{backgroundColor:"#0000"}} isVisible={this.state.modalVisible} onBackdropPress={this.setModalVisible}>
                    <View style={{flex:1, justifyContent:"center",margin:10,paddingVertical:10,paddingHorizontal: 10,}}>
                        <View style={{elevation:5,backgroundColor:"#fff",alignItems: 'center',justifyContent:"center",padding:5, borderRadius:2,borderColor:"gray"}}>
                            <Text  style={{alignSelf:"center",fontSize:16,paddingTop: 8,}}>
                                Votre commande a bien été enregistrée?
                            </Text>
                            <Text style={{alignSelf:"center",fontSize:16,padding: 5}}>
                                Voulez-vous continuer vos achats?
                            </Text>
                            <Block right style={{flexDirection:"row",margin:5}}>
                                <Button onPress={this.yes} round color="warning" size="small">Oui</Button>
                                <Button onPress={this.no} round color="warning" size="small">Non</Button>
                            </Block>
                        </View>    
                    </View>
                </Overlay>
               
                <Block style={{ 
                    backgroundColor: "#e9e9e9",
                    
                }} >
                
                <ImageBackground
                source={{uri:"https://centrech.net/storage/images/menu/"+menu.image}}
                style={{height:200, padding: 0,zIndex: 1}} 
                >
                </ImageBackground>
                    
                <Block  style={{padding: 10}}>
                    <Block left >
                        <Text
                            style={{
                            color: '#2c2c2c',
                            fontWeight: 'bold',
                            fontSize: 19,
                            zIndex: 2
                            }}
                        >
                            {menu.name && menu.name.charAt(0).toUpperCase() + menu.name.slice(1)}
                        </Text>
                        <Text
                            size={16}
                            muted
                            style={{
                                textAlign: 'justify',
                                zIndex: 2,
                                lineHeight: 25,
                                color: '#9A9A9A',
                            }} 
                        > {menu.description && menu.description.charAt(0).toUpperCase() + menu.description.slice(1)}
                        </Text>
                    </Block>       
                </Block>
                </Block>
                {
                    (this.state.hasVariante || this.state.hasExtra) && <Block card flex style={{backgroundColor:"#fff",borderColor:"#fff",elevation:1,marginHorizontal:10,marginTop:20,paddingVertical: 10,bottom:1}}>
                                    {variante} 

                                    {extras} 

                                </Block>
                    }
                   
                <Block card flex style={{backgroundColor:"#fff",borderColor:"#fff",elevation:1,marginHorizontal:10,marginTop:20,paddingVertical: 10,bottom:1}}>
                    <View style={{flex: 1,flexDirection:"row", }}>
                        <Block style={{paddingLeft: 8,flex: this.state.taille,justifyContent:"center",}}>
                            <SimpleStepper   
                                initialValue={1}
                                textStyle={{paddingVertical: 8,paddingHorizontal:10, fontSize: 20, fontWeight: 'bold', color: 'black'}}
                                showText={true}
                                containerStyle={{backgroundColor: 'transparent', flexDirection: 'row', borderWidth: StyleSheet.hairlineWidth, borderRadius: 8, overflow: 'hidden', alignItems: 'center', borderColor: '#ffa800',height:StyleSheet.hairlineHeight}}
                                separatorStyle={{width: StyleSheet.hairlineWidth, backgroundColor: '#ffa800', height: '100%'}}
                                incrementImageStyle={{height: 25, width: 25}}
                                decrementImageStyle={{height: 25, width: 25}}
                                incrementStepStyle ={{paddingHorizontal:8, paddingVertical:4}}
                                decrementStepStyle ={{paddingHorizontal:8, paddingVertical:4}}
                                maximumValue={100}
                                valueChanged={value => this.valueChanged(value)} />   
                        </Block>
                        <Block flex={1-this.state.taille} right style={{marginRight:8,justifyContent: 'center',}}>
                            <Text h5>
                                { !this.state.prix && menu.prix_vente}  
                                {this.state.prix && this.state.prix} F
                            </Text>
                        </Block>
                    </View>
                    
                    <View style={{justifyContent:"center",alignItems:'center'}}>
                        <Button  
                            onlyIcon={false} 
                            icon="plus"
                            round  
                            iconFamily="antdesign" 
                            color="warning" 
                            iconColor="#fff" 
                            style={{width:180,textAlign:"center", justifyContent: 'center',marginLeft:15 ,paddingHorizontal: 5,}}
                            onPress={() => this.addToCart()}
                            >Ajouter au panier</Button>
                    </View>
                </Block>
            </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
 
    return {
        menus: state.menus,
        user: state.auth ,
        order: state.order
    }  
}
   
export default connect(mapStateToProps,{setItem,setOrderPrice,removeOrder})(DetailScreen) 
  
  
  


