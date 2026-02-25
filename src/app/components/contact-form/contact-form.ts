import { ContactService } from './../../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm implements OnInit {
  form!: FormGroup;
  isEdit = false;
  contactId!: string;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private ContactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      last: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      tag: ['work', Validators.required],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.contactId = id;
      this.loadContact(id);
    }
  }

  loadContact(id: string): void {
    this.ContactService.getById(id).subscribe({
      next: (contact) => this.form.patchValue(contact),
      error: () => alert('Contato não encontrado'),
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;

    if (this.isEdit) {
      this.ContactService.update(this.contactId, this.form.value).subscribe({
        next: () => this.router.navigate(['/contacts']),
        error: () => {
          alert('Erro ao atualizar contato');
          this.loading = false;
        },
      });
    } else {
      this.ContactService.create(this.form.value).subscribe({
        next: () => this.router.navigate(['/contacts']),
        error: () => {
          alert('Erro ao criar contato');
          this.loading = false;
        },
      });
    }
  }
}
