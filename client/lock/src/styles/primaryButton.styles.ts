import { typography } from '@/assets/fonts/typography ';
import { Theme } from '@/theme/types';
import { StyleSheet } from "react-native";

export const styles = (theme: Theme) => StyleSheet.create({
    primaryButton: {
        backgroundColor: theme.primaryColor,
        height: 52,
        borderWidth: 1,
        borderColor: theme.primaryColor,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "5%",
    },
    primaryButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        borderWidth: 1,
        width: "100%",
        height: "100%",
        borderColor: theme.primaryColor,
        paddingHorizontal: 16,
        backgroundColor: theme.primaryColor,
    },
    primaryButtonText: {
        color: theme.textColor2,
        fontFamily: typography.bold,
        fontSize: 18,
    },
    primaryButtonTextWithIcon: {
        marginLeft: 8,
    },
})