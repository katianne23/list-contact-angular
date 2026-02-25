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
  refreshing = false;
  error = '';

  private readonly CACHE_KEY = 'contacts_cache';
  private readonly CACHE_TIMESTAMP_KEY = 'contacts_cache_timestamp';
  private readonly CACHE_DURATION = 5 * 60 * 1000; 

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(forceRefresh = false): void {
    const cached = this.loadFromCache();
    
    if (cached && !forceRefresh) {
      this.contacts = cached;
      this.filtered = cached;
      
      if (this.isCacheExpired()) {
        this.refreshInBackground();
      }
    } else {
      this.loading = true;
      this.fetchFromApi();
    }
  }

   private refreshInBackground(): void {
    this.refreshing = true;
    this.contactService.getAll().subscribe({
      next: (data) => {
        this.contacts = data;
        this.filtered = data;
        this.saveToCache(data);
        this.refreshing = false;
      },
      error: () => {
        this.refreshing = false;
      },
    });
  }

  private fetchFromApi(): void {
    this.contactService.getAll().subscribe({
      next: (data) => {
        this.contacts = data;
        this.filtered = data;
        this.saveToCache(data);
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar os contatos!';
        this.loading = false;
      },
    });
  }

  private loadFromCache(): Contact[] | null {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  }

  private saveToCache(data: Contact[]): void {
    try {
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(data));
      localStorage.setItem(this.CACHE_TIMESTAMP_KEY, Date.now().toString());
    } catch (error) {
      console.error('Erro ao salvar cache:', error);
    }
  }

  private isCacheExpired(): boolean {
    const timestamp = localStorage.getItem(this.CACHE_TIMESTAMP_KEY);
    if (!timestamp) return true;
    
    const age = Date.now() - parseInt(timestamp, 10);
    return age > this.CACHE_DURATION;
  }

  clearCache(): void {
    localStorage.removeItem(this.CACHE_KEY);
    localStorage.removeItem(this.CACHE_TIMESTAMP_KEY);
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
