import { DevSettings, StyleSheet } from "react-native";
import Colors  from "../../constants/Colors";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 15,
        alignItems: 'flex-end'

    },
    mainContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 10,
        margin: 10,
        flex: 1,
        alignItems: 'flex-end'
    },
    button: {
        backgroundColor: Colors.light.tint,
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textMessage: {
        flex: 1,
        marginHorizontal: 10
    }
})

export default styles;