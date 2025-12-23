import { light } from "@/src/theme/light";
import { Platform, StyleSheet } from "react-native";


export const style = StyleSheet.create({
    container:{
        backgroundColor: light.backgroundColor,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },

    content: {
        width: '85%',
        height: '85%'
    },

    headerSection: {
    alignItems: 'center',
    width: '100%',
    },

    logo: {
        width: 125,
        height: 125,
    },
    
    slogan: {
        fontSize: 22,
        width: '100%',
        textAlign: "center",
        fontWeight: "regular",
        marginBottom: 24,
    },

    header: {
        width: '100%',
        justifyContent: "flex-start"
    },

    form: {
        width: '100%',
    },

    label: {
        fontSize: 22,
        fontWeight: "regular",
        marginBottom: 20
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: light.appColor,
        borderRadius: 6,
        paddingHorizontal: 12,
        marginBottom: 12,
    },

    inputDisabled: {
        borderColor: light.borderColor
    },

    input: {
        flex: 1,
        height: 48
    },

    primaryButton: {
        backgroundColor: light.appColor,
        height: 48,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8
    },

    primaryButtonText: {
        color: light.textColor2,
        fontWeight: 'bold',
        fontSize: 18
    },

    actions: {
        width: '100%',
    },

    forgot: {
        textAlign: 'center',
        textDecorationLine: "underline",
        color: light.appColor,
        marginVertical: 12,
        fontSize: 12
    },

    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16
    },

    line: {
        flex: 1,
        height: 1,
        backgroundColor: light.appColor
    },

    or: {
        fontWeight: "bold",
        marginHorizontal: 8,
        fontSize: 16,
        marginBottom: 3,
    },

    googleButton: {
        flexDirection: 'row',
        height: 48,
        borderWidth: 1,
        borderColor: light.appColor,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },

    googleText: {
        color: light.appColor,
        fontWeight: '500',
        fontSize: 18
    },

    register: {
        marginTop: 12,
        textAlign: 'center',
        textDecorationLine: "underline",
        fontSize: 12,
        color: light.appColor
    }
})