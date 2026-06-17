import { typography } from '@/assets/fonts/typography ';
import { Theme } from '@/theme/types';
import { StyleSheet } from "react-native";

export const styles = (theme: Theme) => StyleSheet.create({
  
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.borderColor,
        borderRadius: 14,
        paddingHorizontal: 12,
        marginBottom: 12,
    },

    inputSelected: {
        borderColor: theme.primaryColor
    },

    input: {
        flex: 1,
        height: 48,
        fontFamily: typography.regular
    }
})