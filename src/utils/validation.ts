/**
 * Form validation utilities
 * Reusable validation functions
 */

export interface ValidationResult {
    isValid: boolean;
    error?: string;
}

export const validateEmail = (email: string): ValidationResult => {
    if (!email) {
        return { isValid: false, error: 'Email is required' };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, error: 'Please enter a valid email address' };
    }
    
    return { isValid: true };
};

export const validatePassword = (password: string, minLength: number = 8): ValidationResult => {
    if (!password) {
        return { isValid: false, error: 'Password is required' };
    }
    
    if (password.length < minLength) {
        return { isValid: false, error: `Password must be at least ${minLength} characters long` };
    }
    
    return { isValid: true };
};

export const validatePasswordMatch = (password: string, confirmPassword: string): ValidationResult => {
    if (!confirmPassword) {
        return { isValid: false, error: 'Please confirm your password' };
    }
    
    if (password !== confirmPassword) {
        return { isValid: false, error: 'Passwords do not match' };
    }
    
    return { isValid: true };
};

export const validateRequired = (value: string, fieldName: string = 'Field'): ValidationResult => {
    if (!value || value.trim() === '') {
        return { isValid: false, error: `${fieldName} is required` };
    }
    
    return { isValid: true };
};

export const validateForm = <T extends Record<string, string>>(
    formData: T,
    validators: Partial<Record<keyof T, (value: string) => ValidationResult>>
): { isValid: boolean; errors: Partial<Record<keyof T, string>> } => {
    const errors: Partial<Record<keyof T, string>> = {};
    
    for (const [field, validator] of Object.entries(validators)) {
        if (validator) {
            const result = validator(formData[field]);
            if (!result.isValid && result.error) {
                errors[field as keyof T] = result.error;
            }
        }
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

