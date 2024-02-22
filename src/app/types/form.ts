export type FormError = {
    status: boolean;
    message?: string;
    data?: {
        personName: string | null,
        personId: string | null,
        gender: string | null,
        dateOfBirth: string | null,
    }
} | null;