import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactList } from './components/contact-list/contact-list';
import { ContactForm } from './components/contact-form/contact-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ContactList, ContactForm],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('contacts-app');
}
