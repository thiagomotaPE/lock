import { typography } from '@/assets/fonts/typography ';
import { Theme } from '@/theme/types';
import { StyleSheet } from "react-native";

export const styles = (theme: Theme) => StyleSheet.create({
    primaryButton: {
        backgroundColor: theme.primaryColor,
        height: 48,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "5%"
    },

    primaryButtonText: {
        color: theme.textColor2,
        fontFamily: typography.bold,
        fontSize: 18
    }
})