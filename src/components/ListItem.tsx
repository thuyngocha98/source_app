import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ListItem = (props) => {
    return (
      <TouchableOpacity>
        <View style = { styles.listItem }>
          <Text>{ props.placeName }</Text>
          <Text>{props.subtitle}</Text>
          <Image 
            style={{width:50, height: 50}}
            source={{ uri: props.image}}
          />
          
        </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'column',
    width: '100%',
    padding: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    backgroundColor: '#eee'
  }
});

export default ListItem;