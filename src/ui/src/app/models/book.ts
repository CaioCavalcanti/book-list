export interface Book {
    isbn: string;
    title: string;
    authors: string[];
    description: string;
    shelved: boolean;
    reading: boolean;
}