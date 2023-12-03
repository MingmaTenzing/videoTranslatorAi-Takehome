import { Component, afterNextRender } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,

    MatSlideToggleModule,
    FormsModule,
    MatCardModule,
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private readonly supabase: SupabaseService) {
    afterNextRender(() => {
      this.supabase.initialize();
    });
  }
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  getStarted: boolean = true;

  startLogin() {
    this.getStarted = !this.getStarted;
  }
  async login(): Promise<void> {
    try {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      const { error, data } = await this.supabase.login(email!, password!);
      if (error) {
        console.log(error.message);
      }
      if (data) {
        console.log(data);
      }
    } finally {
      console.log('user is logged in');
    }
  }
}
