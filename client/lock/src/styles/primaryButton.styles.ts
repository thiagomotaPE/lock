import { typography } from '@/assets/fonts/typography ';
import { measures } from '@/assets/measures/measures';
import { Theme } from '@/theme/types';
import { StyleSheet } from "react-native";

export const styles = (theme: Theme) => StyleSheet.create({
    primaryButton: {
        backgroundColor: theme.primaryColor,
        height: measures.sizes.buttonHeight,
        borderWidth: 1,
        borderColor: theme.primaryColor,
        borderRadius: measures.radius.r14,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "5%"
    },

    primaryButtonText: {
        color: theme.textColor2,
        fontFamily: typography.bold,
        fontSize: measures.fontSize.f18
    }
})