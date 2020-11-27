import React from 'react';
import { StyleSheet, Dimensions, FlatList, Animated } from 'react-native';
import { Block, theme } from 'galio-framework';

const { width } = Dimensions.get('screen');

const defaultMenu = [
  { id: 'music', title: 'Music', },
  { id: 'beauty', title: 'Beauty', },
  { id: 'fashion', title: 'Fashion', },
  { id: 'motocycles', title: 'Motocycles', },
];

export default class Tabs extends React.Component {
  static defaultProps = {
    data: defaultMenu, 
    initialIndex: null,
  }

  state = {
    active: null,
  }

  componentDidMount() {
    const { initialIndex } = this.props;
    initialIndex && this.selectMenu(initialIndex);
  }

  animatedValue = new Animated.Value(1);

  animate() {
    this.animatedValue.setValue(0);

    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false, // color not supported
    }).start()
  }

  menuRef = React.createRef();

  onScrollToIndexFailed = () => {
    this.menuRef.current.scrollToIndex({
      index: 0,
      viewPosition: 0.5
    });
  }

  selectMenu = (id) => {
    this.setState({ active: id });
    
    this.menuRef.current.scrollToIndex({
      index: this.props.data.findIndex(item => item.id === id),
      viewPosition: 0.5
    });
    
    this.animate();
     
    this.props.onChange && this.props.onChange(id);
    this.props.menu && this.props.price(this.props.data.find(item => item.id === id).prix_vente)
  }

  renderItem = (item) => {
    const isActive = this.state.active === item.id;

    const textColor = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.COLORS.TEXT, isActive ? theme.COLORS.WHITE : theme.COLORS.SECONDARY],
      extrapolate: 'clamp',
    });

    let containerStyles,title;
    if(this.props.menu){
      containerStyles = [
        styles.menuTitleContainer,
        !isActive && { borderColor: "#e9e9e9", backgroundColor: "#e9e9e9",color:"black", borderWidth:0 },
        isActive && styles.menuContainerShadow
      ];
      if(item.attribut_value.length==2){
        title = item.attribut_value[0] + " && " + item.attribut_value[1]}
      else {title = item.attribut_value[0]}
    }else{
      containerStyles = [
        styles.titleContainer,
        !isActive && { backgroundColor: "#fff" },
        isActive && styles.containerShadow
      ];
      title = item.title
    }
    const id = item.id;
    return (
      <Block style={containerStyles}>
        <Animated.Text
          style={[
            styles.menuTitle,
            { color: "black" },
            
          ]} 
          onPress={() => this.selectMenu(id)}>
          {title}
        </Animated.Text>
      </Block>
    )
  }

  renderMenu = () => {
    const { data, ...props } = this.props;
    const men = [
      !this.props.menu && styles.menu,
      this.props.menu && styles.menu1
    ];
    return (
      <FlatList
        {...props}
        data={data}
        horizontal={true}
        ref={this.menuRef}
        extraData={this.state}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        onScrollToIndexFailed={this.onScrollToIndexFailed}
        renderItem={({ item }) => this.renderItem(item)}
        contentContainerStyle={men}
      />
    )
  }

  render() {
    let container;
    if(this.props.menu){
      container = [
        styles.container1,
      ];
    }else{
      container = [
        styles.container,
      ];
    }
    return (
      <Block style={container}>
        {this.renderMenu()}
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: width-20,
    zIndex: 2,
  },
  container1: {
    width: width-40,
    zIndex: 2,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
  },
  menu: {
    paddingRight: theme.SIZES.BASE * 1.5,
    backgroundColor: "#e9e9e9",
    
  },
  menu1: {
    paddingRight: theme.SIZES.BASE * 1.5,
    backgroundColor: "#fff",
    
  },
  titleContainer: {
    alignItems: 'center',
    backgroundColor: "#ffa800", 
    borderRadius: 21,
    marginRight: 9,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  containerShadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  menuTitleContainer: {
    alignItems: 'center',
    borderColor: "#ffa800",
    color:"white",
    borderWidth:1, 
    backgroundColor: "#ffa800",
    borderRadius: 0,
    marginRight: 5,
    padding: 3,
  },
  menuContainerShadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 1,
  },
  menuTitle: {
    fontWeight: '600',
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    color: theme.PLACEHOLDER 
  },
});
 