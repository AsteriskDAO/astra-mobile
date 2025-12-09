/**
 * Health-related types for conditions, medications, and treatments
 */

export interface Condition {
    id: string;
    name: string;
    dateDiagnosed: string;
    type: string;
    status: string;
    notes: string;
}

export interface Medication {
    id: string;
    name: string;
    startDate: string;
    type: string;
    status: string;
    dosage: string;
    frequency: string;
    notes: string;
}

export interface Treatment {
    id: string;
    name: string;
    startDate: string;
    type: string;
    status: string;
    frequency: string;
    notes: string;
}

