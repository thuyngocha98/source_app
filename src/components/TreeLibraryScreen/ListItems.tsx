import React, { PureComponent } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import colors from '../Common/Colors';
import { screenWidth, IS_IOS } from '../Common/Dimension'


type Props = {
    title?: string,
    description?: string,
    img?: string,
}

export default class ListItems extends PureComponent<Props>{
    render(){
        const { title, description, img } = this.props;
        return(
            <View style={styles.container}>
                <View style={styles.styleImage}>
                    <Image
                        style={styles.photo}
                        source={{ uri: img }}
                    />
                </View>
                <View style={styles.container_text}>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    <Text style={styles.description} numberOfLines={3}>
                        {description}
                    </Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: screenWidth/36,
        marginHorizontal: '4%',
        marginVertical: '2%',
        borderRadius: screenWidth/45,
        backgroundColor: colors.white,
        marginBottom: screenWidth/72,
        marginTop: screenWidth / 36,
    },
    styleImage: {
        borderTopLeftRadius: IS_IOS ? 5 : 5,
        borderBottomLeftRadius: IS_IOS ? 5 : 5,
        borderTopRightRadius: IS_IOS ? 5 : 5,
        borderBottomRightRadius: IS_IOS ? 5 : 5,
        overflow: 'hidden',
    },
    photo: {
        width: screenWidth / 3.6,
        height: screenWidth / 3.6,
        resizeMode: 'contain',
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: '5%',
        justifyContent: 'center',
        alignContent: 'center',
    },
    title: {
        fontSize: 17,
        color: colors.black,
        paddingBottom: 5

    },
    description: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#777777'
    },
});