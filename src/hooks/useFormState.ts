import { useState, useCallback } from 'react';

/**
 * Custom hook for managing form state with change tracking
 * 
 * @example
 * const { formData, handleChange, hasChanges, reset } = useFormState({
 *   name: '',
 *   email: ''
 * });
 */
export const useFormState = <T extends Record<string, any>>(initialData: T) => {
    const [formData, setFormData] = useState<T>(initialData);
    const [hasChanges, setHasChanges] = useState(false);

    const handleChange = useCallback((field: keyof T, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setHasChanges(true);
    }, []);

    const handleMultipleChanges = useCallback((updates: Partial<T>) => {
        setFormData(prev => ({ ...prev, ...updates }));
        setHasChanges(true);
    }, []);

    const reset = useCallback((newData?: T) => {
        setFormData(newData || initialData);
        setHasChanges(false);
    }, [initialData]);

    const setFormDataDirectly = useCallback((data: T) => {
        setFormData(data);
        setHasChanges(false);
    }, []);

    return {
        formData,
        handleChange,
        handleMultipleChanges,
        hasChanges,
        reset,
        setFormData: setFormDataDirectly,
    };
};

