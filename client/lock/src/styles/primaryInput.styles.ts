import { typography } from '@/assets/fonts/typography ';
import { measures } from '@/assets/measures/measures';
import { Theme } from '@/theme/types';
import { StyleSheet } from "react-native";

export const styles = (theme: Theme) => StyleSheet.create({
  
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.borderColor,
        borderRadius: measures.radius.r14,
        paddingHorizontal: measures.spacing.s12,
        marginBottom: measures.spacing.s12,
    },

    inputSelected: {
        borderColor: theme.primaryColor
    },

    input: {
        flex: 1,
        height: measures.sizes.inputHeight,
        fontFamily: typography.regular
    }
})