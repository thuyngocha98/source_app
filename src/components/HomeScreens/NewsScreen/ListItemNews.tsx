import React, { PureComponent } from 'react'
import { 
    View,
    StyleSheet, 
    Text, 
    Image 
} from 'react-native'
import { screenWidth, IS_IOS, sliderWidth } from '../../Common/Dimension';
import colors from '../../Common/Colors';


type Props = {
    urlImage?: string,
    title?: string,
    date?: string,
}

export default class ListItemNews extends PureComponent<Props> {
    render() {

        const { urlImage, title, date } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.styleImage}>
                    <Image
                        style={styles.photo}
                        source={{ uri: urlImage }}
                    />
                </View>
                <View style={styles.container_text}>
                    <Text style={styles.title} numberOfLines={2}>
                        {title}
                    </Text>
                    <Text style={styles.description} numberOfLines={1}>
                        {date}
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
        padding: screenWidth / 36,
        marginHorizontal: '4%',
        marginVertical: '2%',
        borderRadius: 5,
        backgroundColor: colors.white,
        marginBottom: screenWidth / 72,
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
        width: sliderWidth * (4 / 12),
        height: (sliderWidth * (4 / 9)) / 1.4,
        resizeMode: 'contain',
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: '3.5%',
        marginRight: '1.5%',
        justifyContent: 'center',
        alignContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
        color: colors.black,
        paddingBottom: 5

    },
    description: {
        fontSize: 12,
        fontStyle: 'italic',
        color: '#777777',
        fontWeight: 'bold',
    },
});