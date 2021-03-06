import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-between',
        padding: 10, 

    },
    leftContainer: {
        flexDirection: 'row',
        
    },
    midContainer: {
        justifyContent: 'space-around',
    },
    
    avatar: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 50, 
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 16 
    },
    lastMsg: {
        fontSize: 16,
        color: 'darkgray',
    },
    time: {
        fontSize: 16,
        color: 'darkgray'
    }
});

export default styles;