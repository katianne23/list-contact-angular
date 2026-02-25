import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private url = 'https://699dfc0783e60a406a47f0bb.mockapi.io/contacts'

  constructor(private http: HttpClient) {}

  getAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.url);
  }

  getById(id: string) : Observable<Contact> {
    return this.http.get<Contact>(`${this.url}/${id}`);
  }

  update(contact: Contact): Observable<Contact>{
    return this.http.put<Contact>(`${this.url}/${contact.id}`, contact);
  }

  delete(id: string): Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}
