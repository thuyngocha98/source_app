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

export default class ListItemBottomNews extends Component<Props> {
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
                                <Text style={styles.date}>
                                    {date}
                                </Text>
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
        width: sliderWidth * (4 / 9),
        height: (sliderWidth * (4 / 9)) / 1.7,
        resizeMode: 'cover',
    },
    containerText: {
        width: sliderWidth * (4 / 9),
        paddingVertical: screenWidth/45,
        paddingHorizontal: screenWidth/72,
        backgroundColor: colors.white,
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius,
        marginBottom: screenWidth/36,
    },
    title: {
        color: colors.black,
        fontSize: 12,
        fontWeight: 'bold',
        paddingRight: screenWidth/72
    },
    date: {
        color: '#777777',
        fontSize: 9,
        fontWeight: 'bold',
        fontStyle: 'italic',
        alignItems: 'flex-start',
    },
    styleTitle: {
        flexDirection: 'column',
    },
    containerDetail: {
        backgroundColor: colors.white,
    }
});