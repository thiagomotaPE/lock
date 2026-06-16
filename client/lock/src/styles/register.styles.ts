import { typography } from '@/assets/fonts/typography ';
import { measures } from '@/assets/measures/measures';
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
        width: measures.sizes.logoLarge,
        height: measures.sizes.logoLarge,
    },
    
    slogan: {
        fontSize: measures.fontSize.f22,
        width: '100%',
        textAlign: "center",
        fontFamily: typography.regular,
        color: theme.textColor,
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
        fontSize: measures.fontSize.f22,
        fontFamily: typography.regular,
        color: theme.textColor,
        marginBottom: 14
    },

    actions: {
        width: '100%'
    },

    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16
    },

    line: {
        flex: 1,
        height: measures.border.normal,
        backgroundColor: theme.primaryColor
    },

    or: {
        fontFamily: typography.semiBold,
        fontSize: 16,
        marginHorizontal: 8,
        color: theme.textColor

    },

    googleButton: {
        flexDirection: 'row',
        height: measures.sizes.buttonHeight,
        borderWidth: measures.border.normal,
        borderColor: theme.primaryColor,
        borderRadius: measures.radius.r14,
        alignItems: 'center',
        justifyContent: 'center'
    },

    googleText: {
        color: theme.primaryColor,
        fontFamily: typography.semiBold,
        fontSize: measures.fontSize.f18
    },

    haveAccount: {
        marginTop: "30%",
        textAlign: 'center',
        textDecorationLine: "underline",
        fontSize: measures.fontSize.f12,
        fontFamily: typography.regular,
        color: theme.primaryColor
    }
})