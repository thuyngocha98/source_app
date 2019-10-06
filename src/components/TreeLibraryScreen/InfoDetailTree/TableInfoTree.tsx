import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import { screenWidth } from '../../Common/Dimension'

type Props = {
    infoTree?: any[],
}

type State = {
    tableTitle?: any[],
}

export default class TableInfoTree extends Component<Props, State> {

    state = {
        tableTitle: ['Tên khoa học', 'Tên phổ thông', 'Họ thực vật', 'Nguồn gốc xuất xứ', 'Tốc độ sinh trưởng', 'Phân bố ở Việt Nam']
    }

    render() {
        // receive data info tree
        const { infoTree } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.textTitle}>Thông tin cây</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text1}>{this.state.tableTitle[0]}</Text>
                    <Text style={styles.text2} numberOfLines={3} >{infoTree[0]}</Text>
                </View>
                <View style={styles.row1}>
                    <Text style={styles.text1}>{this.state.tableTitle[1]}</Text>
                    <Text style={styles.text2} numberOfLines={3}>{infoTree[1]}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text1}>{this.state.tableTitle[2]}</Text>
                    <Text style={styles.text2} numberOfLines={3}>{infoTree[2]}</Text>
                </View>
                <View style={styles.row1}>
                    <Text style={styles.text1}>{this.state.tableTitle[3]}</Text>
                    <Text style={styles.text2} numberOfLines={3}>{infoTree[3]}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text1}>{this.state.tableTitle[4]}</Text>
                    <Text style={styles.text2} numberOfLines={3}>{infoTree[4]}</Text>
                </View>
                <View style={styles.row1}>
                    <Text style={styles.text1}>{this.state.tableTitle[5]}</Text>
                    <Text style={styles.text2} numberOfLines={3}>{infoTree[5]}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: screenWidth / 72,
        flexDirection: 'column'
    },
    title: {
        flex: 1,
        justifyContent: 'center',
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: screenWidth / 36,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fffaf0',
    },
    row1: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    text1: {
        flex: 1.5,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'auto',
        alignSelf: 'center',
        marginHorizontal: screenWidth / 36,
    },
    text2: {
        flex: 3,
        textAlign: 'auto',
        alignSelf: 'center',
        marginHorizontal: screenWidth / 36
    }
});
