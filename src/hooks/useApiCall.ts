import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { getErrorMessage } from '../utils/errorHandling';

interface UseApiCallOptions {
    showErrorAlert?: boolean;
    errorMessage?: string;
    onSuccess?: () => void;
    onError?: (error: unknown) => void;
}

interface UseApiCallReturn<T> {
    execute: (apiCall: () => Promise<T>) => Promise<T | null>;
    isLoading: boolean;
    error: string | null;
    reset: () => void;
}

/**
 * Custom hook for handling API calls with loading and error states
 * 
 * @example
 * const { execute, isLoading, error } = useApiCall({
 *   showErrorAlert: true,
 *   onSuccess: () => navigation.goBack()
 * });
 * 
 * const handleSave = async () => {
 *   const result = await execute(() => apiService.updateUser(data));
 *   if (result) {
 *     // Success handling
 *   }
 * };
 */
export const useApiCall = <T = any>(options: UseApiCallOptions = {}): UseApiCallReturn<T> => {
    const {
        showErrorAlert = true,
        errorMessage = 'An error occurred',
        onSuccess,
        onError,
    } = options;

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async (apiCall: () => Promise<T>): Promise<T | null> => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await apiCall();
            
            if (onSuccess) {
                onSuccess();
            }
            
            return result;
        } catch (err) {
            const errorMsg = getErrorMessage(err, errorMessage);
            setError(errorMsg);

            if (showErrorAlert) {
                Alert.alert('Error', errorMsg);
            }

            if (onError) {
                onError(err);
            }

            return null;
        } finally {
            setIsLoading(false);
        }
    }, [showErrorAlert, errorMessage, onSuccess, onError]);

    const reset = useCallback(() => {
        setError(null);
        setIsLoading(false);
    }, []);

    return {
        execute,
        isLoading,
        error,
        reset,
    };
};

