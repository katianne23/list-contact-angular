export interface Contact {
id?: string;
name: string;
last: string;
email: string;
phone: string;
address: string;
tag: 'work' | 'friend' | 'family';
}