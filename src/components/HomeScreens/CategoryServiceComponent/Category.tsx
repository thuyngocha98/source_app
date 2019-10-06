import React, { Component } from 'react'
import {
    View,
    Image,
    Text,
    StyleSheet,
    ImageSourcePropType,


} from 'react-native'
import { screenWidth } from '../../Common/Dimension'
import colors from '../../Common/Colors'

type Props = {
    image: ImageSourcePropType,
    title: string,
}

export default class Category extends React.Component<Props>{
    render() {
        const { image, title } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.viewImage}>
                    <Image
                        style={styles.image}
                        source={this.props.image}
                    />
                </View>
                <View style={styles.viewText}>
                    <Text style={styles.text}>{this.props.title}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: screenWidth / 3.6,
        height: screenWidth / 3.6,
        flexDirection: 'column',
        borderRadius: screenWidth / 36,
        justifyContent: 'center',
        alignItems: 'center',
        margin: screenWidth / 72,
        backgroundColor: colors.white,
    },
    viewImage: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    image: {
        width: screenWidth / 9,
        height: screenWidth / 9,
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop: screenWidth/72,
    },
    viewText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        paddingHorizontal: screenWidth / 36,
        textAlign: 'center',
        paddingBottom: screenWidth/72,
    },

});