import React, { Component } from 'react'
import {
    View,
    Image,
    Text,
    StyleSheet,
    ImageSourcePropType,


} from 'react-native'
import { screenWidth } from '../Common/Dimension'
import colors from '../Common/Colors'

type Props = {
    image: ImageSourcePropType,
    title: string,
    styleImage: any,
    styleText: any
}

export default class Category extends React.Component<Props>{
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.view}>
                    <View style={styles.viewImage}>
                        <Image
                            style={this.props.styleImage}
                            source={this.props.image}
                        />
                    </View>
                    <View style={styles.viewText}>
                        <Text
                            style={this.props.styleText}
                        >
                            {this.props.title}
                        </Text>
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: screenWidth / 72,
        backgroundColor: colors.white,

    },
    viewImage: {
        flex: 3.5,
        justifyContent: 'flex-end',
    },
    viewText: {
        marginTop: screenWidth / 72,
        flex: 2,
        alignItems: 'center',
    },
    view: {
        width: screenWidth / 4.5,
        height: screenWidth / 4.5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    }
});