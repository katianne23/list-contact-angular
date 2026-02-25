import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';
import { RouterLink } from '@angular/router';
import { PhoneFormatPipe } from '../../pipes/phone-format.pipe';

@Component({
  selector: 'app-contact-list',
  imports: [RouterLink, PhoneFormatPipe],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
})
export class ContactList implements OnInit {
  contacts: Contact[] = [];
  filtered: Contact[] = [];
  loading = false;
  error = '';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.loading = true;
    this.contactService.getAll().subscribe({
      next: (data) => {
        this.contacts = data;
        this.filtered = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar os contatos!';
        this.loading = false;
      },
    });
  }

  search(term: string): void {
    const t = term.toLowerCase();
    this.filtered = this.contacts.filter((c) =>
      `${c.name} ${c.email} ${c.phone}`.toLocaleLowerCase().includes(t),
    );
  }

  delete(id: string): void {
    if (!confirm('Deseja remover este contato?')) return;
    this.contactService.delete(id).subscribe({
      next: () => {
        this.contacts = this.contacts.filter((c) => c.id !== id);
        this.filtered = this.filtered.filter((c) => c.id !== id);
      },
      error: () => alert('Erro ao remover contato!'),
    });
  }

  tagLabel(tag: string): string {
    const labels: Record<string, string> = { 
      work: '💼 Trabalho', 
      friend: '🤝 Amigo', 
      family: '🏠 Família' 
    };
    return labels[tag] || tag;
  }
}
