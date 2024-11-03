import { Component, signal } from '@angular/core';
import { ButtonPrimaryComponent } from '../button-primary/button-primary.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NewsletterService } from '../../services/newsletter.service';

@Component({
  selector: 'newsletter-form',
  standalone: true,
  imports: [ButtonPrimaryComponent, ReactiveFormsModule],
  providers: [NewsletterService],
  templateUrl: './newsletter-form.component.html',
  styleUrl: './newsletter-form.component.scss',
})
export class NewsletterFormComponent {
  newsletterForm!: FormGroup;
  loading = signal(false);

  constructor(private newsLetterService: NewsletterService) {
    this.newsletterForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    this.loading.set(true);
    if (this.newsletterForm.valid) {
      this.newsLetterService
        .sendData(
          this.newsletterForm.value.name,
          this.newsletterForm.value.email
        )
        .subscribe({
          next: () => {
            this.newsletterForm.reset();
            this.loading.set(false);
          },
          error: () => this.loading.set(false),
        });
    }
  }
}
