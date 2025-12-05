import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    FIXED_HEADER_PADDING_BOTTOM,
    FIXED_HEADER_CONTENT_HEIGHT,
} from '../components/FixedHeader';

/**
 * Hook to get the total height of the FixedHeader including safe area insets.
 * Use this in screens to calculate proper padding-top.
 * 
 * @returns The total header height in pixels
 */
export const useFixedHeaderHeight = (): number => {
    const insets = useSafeAreaInsets();

    return useMemo(() => {
        // Header height = safe area top + content height + bottom padding
        return (
            insets.top +
            FIXED_HEADER_CONTENT_HEIGHT +
            FIXED_HEADER_PADDING_BOTTOM
        );
    }, [insets.top]);
};

