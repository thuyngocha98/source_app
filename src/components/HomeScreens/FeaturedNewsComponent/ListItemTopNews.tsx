import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native'
import { sliderWidth, screenWidth } from '../../Common/Dimension';
import colors from '../../Common/Colors';

type Props = {
    image?: string,
    title?: string,
    date?: string,
}

export default class ListItemTopNews extends Component<Props> {
    render() {

        const { image, title, date } = this.props;

        const uppercaseTitle = title ? (
            <Text
                style={styles.title}
                numberOfLines={1}
            >
                {title.toUpperCase()}
            </Text>
        ) : false;

        return (
            <View style={styles.container}>
                <View style={styles.containerImageAndText}>
                    <View style={styles.styleImage}>
                        <Image
                            style={styles.image}
                            source={{uri: image}}
                        />
                    </View>
                    <View style={styles.containerText}>
                        <View style={styles.styleTitle}>
                            {uppercaseTitle}
                        </View>
                        <View style={styles.containerDetail}>
                            <View style={styles.styleDetail}>
                                <Text style={styles.date}>
                                    {date}
                                </Text>
                                <Text style={styles.detail}>
                                    Chi tiết
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const entryBorderRadius = 8;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'

    },
    containerImageAndText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    styleImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        overflow: 'hidden',
        backgroundColor: colors.gray
    },
    image: {
        width: sliderWidth * (8.25 / 9),
        height: (sliderWidth * (8.25 / 9)) / 1.7,
        resizeMode: 'cover',
    },
    containerText: {
        width: sliderWidth * (8.25 / 9),
        justifyContent: 'center',
        paddingTop: sliderWidth / 18 - entryBorderRadius,
        paddingBottom: sliderWidth / 18,
        paddingHorizontal: sliderWidth / 36,
        backgroundColor: colors.white,
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius,
        marginBottom: screenWidth / 24,
    },
    title: {
        color: colors.black,
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.4,
        paddingRight: screenWidth / 72
    },
    styleDetail: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    date: {
        marginTop: sliderWidth / 90,
        color: colors.green,
        fontSize: 12,
        fontWeight: 'bold',
        fontStyle: 'italic',
        alignItems: 'flex-start',
    },
    detail: {
        paddingHorizontal: sliderWidth / 18,
        paddingVertical: sliderWidth / 72,
        borderRadius: 8,
        overflow: "hidden",
        fontSize: 15,
        alignItems: 'flex-end',
        backgroundColor: colors.green,
        color: colors.white,
    },
    styleTitle: {
        flexDirection: 'column',
    },
    containerDetail: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        marginTop: sliderWidth / 72,
    },
});