import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet,  ActivityIndicator, View } from 'react-native';
import { Block, Text, theme } from 'galio-framework'; 
import { Image } from 'react-native-elements';
import styles from '../assets/css/cardStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Badge } from 'react-native-elements';



const Card = (props) => { 
 
    const imageStyles = [styles.horizontalImage];
    const titleStyles = [styles.cardTitle];
    const cardContainer = [styles.card, styles.shadow];
    const imgContainer = [
      styles.imageContainer, 
      styles.horizontalStyles ,
      styles.shadow
    ];
    
    const _img = props.item.image.split('/')
    const img = "https://centrech.net/storage/images/menu/"+_img[_img.length-1]
    return ( 
      <TouchableOpacity onPress={() => props.onPress(props.item.id)}> 
      <Block key={props.item.id} row={true} card flex style={cardContainer}>
        
        <Block flex style={imgContainer}>
          <Image  source={{uri:img}} style={imageStyles}  PlaceholderContent={<ActivityIndicator size="small" color="#ffa800"/>} />
        </Block>

        <Block flex space="between" style={styles.cardDescription}>
            <Block flex> 
              <Text
                size={16}
                style={titleStyles}
                color="black"
                bold
                numberOfLines={1}
              >{props.item.name.charAt(0).toUpperCase() + props.item.name.slice(1)}
               
              </Text>
              <Block flex >
                    <Text
                    style={{ textAlign: 'justify', paddingLeft: 2 }}
                    size={14}
                    color={"black"}
                    numberOfLines={2}
                    >
                    {props.item.description.charAt(0).toUpperCase() + props.item.description.slice(1)}
               
                    </Text>
                </Block>
                <Block  right style={{marginBottom:5,marginRight:5}}>
                      <View style={{paddingVertical: 4,paddingHorizontal: 6,backgroundColor:"#ffa800",borderRadius:21}}>
                        <Text style={{color:"white"}}>{props.item.prix_vente} F</Text>
                      </View>
                </Block>
                
            </Block>
        </Block>
 
    </Block>
    </TouchableOpacity>
    );
}

export default Card;


