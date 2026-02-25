import { Routes } from '@angular/router';
import { ContactList } from './components/contact-list/contact-list';
import { ContactForm } from './components/contact-form/contact-form';

export const routes: Routes = [
    {
        path: 'contacts',
        component: ContactList,
    },
    {
        path: 'contacts/new',
        component: ContactForm
    },
    {
        path: 'contacts/edit/:id',
        component: ContactForm
    },
    {
        path: '',
        redirectTo: '/contacts',
        pathMatch: 'full'
    }
];
