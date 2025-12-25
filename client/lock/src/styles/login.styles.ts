import { typography } from '@/assets/fonts/typography ';
import { Theme } from '@/theme/types';
import { StyleSheet } from "react-native";

export const styles = (theme: Theme) => StyleSheet.create({
    container:{
        backgroundColor: theme.backgroundColor,
        alignItems:'center',
        justifyContent:'center',
    },

    content: {
        width: '90%',
        height: '100%'
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
        fontFamily: typography.regular,
        color: theme.textColor,
        marginBottom: 24,
    },

    form: {
        width: '100%',
        marginTop: 15
    },

    label: {
        fontSize: 22,
        fontFamily: typography.regular,
        color: theme.textColor,
        marginBottom: 14
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.primaryColor,
        borderRadius: 6,
        paddingHorizontal: 12,
        marginBottom: 12,
    },

    inputDisabled: {
        borderColor: theme.borderColor
    },

    input: {
        flex: 1,
        height: 48,
        fontFamily: typography.regular
    },

    actions: {
        width: '100%',
    },

    forgot: {
        textAlign: 'center',
        textDecorationLine: "underline",
        color: theme.primaryColor,
        marginVertical: 12,
        fontSize: 12,
        fontFamily: typography.regular
    },

    divider: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    line: {
        flex: 1,
        height: 1,
        backgroundColor: theme.primaryColor
    },

    or: {
        fontFamily: typography.semiBold,
        marginHorizontal: 8,
        fontSize: 16
    },

    googleButton: {
        flexDirection: 'row',
        height: 48,
        borderWidth: 1,
        borderColor: theme.primaryColor,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8
    },

    googleText: {
        color: theme.primaryColor,
        fontFamily: typography.semiBold,
        fontSize: 18
    },

    register: {
        marginTop: "55%",
        textAlign: 'center',
        textDecorationLine: "underline",
        fontSize: 12,
        fontFamily: typography.regular,
        color: theme.primaryColor
    }
})