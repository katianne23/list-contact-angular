import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private url = 'https://699dfc0783e60a406a47f0bb.mockapi.io/contacts';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.url);
  }

  getById(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.url}/${id}`);
  }

  create(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.url, contact);
  }

  update(contactId: string, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.url}/${contactId}`, contact);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
