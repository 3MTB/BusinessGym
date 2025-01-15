import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthPaths, RutasPaginas} from "Constants/ConstantRutas"
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../data-access/auth.service';

interface loginForm {
  email: FormControl<null | string>;
  password: FormControl<null | string>;
}


@Component({
  selector: 'app-auth-log-in',
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './auth-log-in.component.html',
  styleUrl: './auth-log-in.component.css'
})
export default class AuthLogInComponent  {
  protected readonly AuthPaths = AuthPaths;
  // private _formBuilder = inject(FormBuilder);
  // private _authService = inject(AuthService);
  private _route = inject(Router);
  message: string | null = null;
  form!: FormGroup;

  constructor(private _authService: AuthService, private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group<loginForm>({
      email: this._formBuilder.control(null, [Validators.required, Validators.email]),
      password: this._formBuilder.control(null, [Validators.required]),
    });
  }

  // async ngOnInit() {
  //   await this._authService.signOut();
  // }


  async entrar() {
    if (this.form.invalid) {
      this.form.markAsTouched();
      return;
    }
    const result = await this._authService.logIn({
      email: this.form.value.email!,
      password: this.form.value.password!
    });
    if (result.error !== null) {
      if (result.error.code === "invalid_credentials") {
        this.message = "Credenciales incorrectas";
      }
    } else {
      await this._route.navigate([RutasPaginas.Home]);
    }
  }

}
