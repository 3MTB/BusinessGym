import {AuthService} from './../../data-access/auth.service';
import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthPaths} from "Constants/ConstantRutas"

interface SignUpForm {
  email: FormControl<null | string>;
  password: FormControl<null | string>;
  role: FormControl<null | string>;
}

@Component({
  selector: 'app-auth-sign-up',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './auth-sign-up.component.html',
  styleUrl: './auth-sign-up.component.css'
})
export default class AuthSignUpComponent {
  message: string | null = null;
  Signed = false;
  form!: FormGroup;

  constructor(private _route: Router, private _authService: AuthService, private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group<SignUpForm>({
      email: this._formBuilder.control(null, [Validators.required, Validators.email]),
      role: this._formBuilder.control(null, [Validators.required]),
      password: this._formBuilder.control(null, [Validators.required]),
    });
  }

  // async ngOnInit() {
  //   await this._authService.signOut();
  // }

  async enviar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const {error} = await this._authService.signUp({
      email: this.form.value.email!,
      password: this.form.value.password!,
      role: this.form.value.role!
    });
    if (error === null) {
      this.Signed = true;
      this.message = "";
      this._route.navigate([AuthPaths.LogIn]);

    } else {
      if (error.code == "weak_password") {
        this.message = "Passwords is too weak. " + error.message;
      } else if (error.code == "email_not_match") {
        this.message = error.message;
      } else if (error.code == "email_exists") {
        this.message = error.message;
      } else if (error.message == "Failed to fetch") {
        this.message = "Revisa tu conexion antes de intentarlo nuevamente";
      } else {
        console.error("Error handling out the sign up ::: ", error.code);
        this.message = "Error signing up account";
      }
    }
  }

  protected readonly AuthPaths = AuthPaths;
}
