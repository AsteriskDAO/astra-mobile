/**
 * Error handling utilities
 * Centralized error message extraction and display
 */

export const getErrorMessage = (error: unknown, defaultMessage: string = 'An error occurred'): string => {
    if (error instanceof Error) {
        return error.message || defaultMessage;
    }
    if (typeof error === 'string') {
        return error;
    }
    return defaultMessage;
};

export const isApiError = (error: unknown): error is { error: string } => {
    return typeof error === 'object' && error !== null && 'error' in error;
};

export const extractApiErrorMessage = (error: unknown, defaultMessage: string = 'An error occurred'): string => {
    if (isApiError(error)) {
        return error.error;
    }
    return getErrorMessage(error, defaultMessage);
};

