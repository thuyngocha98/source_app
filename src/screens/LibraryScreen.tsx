import React from 'react';
import { 
    ScrollView,
    StyleSheet,
    View,

} from 'react-native';
import ViewTree from '../components/TreeLibraryScreen/ViewTree'


export default function LibraryScreen() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.searchTree}>
                    <ViewTree /> 
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    contentContainer: {

    },
    searchTree: {
        flex: 1,
    },

});
