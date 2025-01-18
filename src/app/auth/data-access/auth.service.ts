import {inject, Injectable} from "@angular/core";
import {environment} from '../../../environments/environment';
import {createClient, SignUpWithPasswordCredentials, SupabaseClient, User, UserMetadata} from '@supabase/supabase-js';
import {BehaviorSubject, Observable} from 'rxjs';

import {Roles} from 'Constants/ConstGenerales'
import {IUser} from '../../shared/Modelos/Usuario';
import {CanMatchFn} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {
  private _supabaseClient: SupabaseClient;
  private userRole = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRole.asObservable();

  constructor() {
    this._supabaseClient = createClient(environment.SUPABASE_URL, environment.SUPABASE_APIKEY);
    this.initializeAuthState().catch(console.error);
    this._supabaseClient.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const role = session.user.user_metadata['role'] as string;
        this.userRole.next(role);
      } else {
        this.userRole.next(null);
      }
    });
  }

  private async initializeAuthState() {
    const {data: {session}} = await this._supabaseClient.auth.getSession();
    if (session?.user) {
      const role = session.user.user_metadata['role'] as string;
      this.userRole.next(role);
    } else {
      this.userRole.next(null);
    }
  }

  async signUp(user: IUser) {

    const resultado = await this._supabaseClient.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: {
          role: user.role,
        }
      }
    });
    console.log(resultado);

    if (resultado.error == null && resultado.data != null) {

      const {data, error} = await this._supabaseClient
        .from('Clientes')
        .insert([
          {
            Nombre: 'New name client',
            Apellido: 'last name client',
            Telefono: "999-666-7777",
            userId: resultado.data.user?.id
          },
        ])
        .select();
      console.log("valor registrado",data);
      console.warn("error al registrar",error);

    }

    // if (resultado.error == null && resultado.data != null) {
    //   const createdUser: User = resultado.data.user!;
    //   console.log(createdUser);

    // const { data , error } = await this._supabaseClient
    //   .from('profiles')
    //   .insert([
    //     { id: 0, role: user.role },
    //   ])
    //   .select()
    // console.log("data:",data, "error",error)
    //   }
    return resultado;
  }


  async logIn(credentials: SignUpWithPasswordCredentials) {
    const resultado = await this._supabaseClient.auth.signInWithPassword(credentials);
    if (resultado.data.user) {
      const rol = resultado.data.user.user_metadata['role'] as string;
      this.userRole.next(rol);
    }
    return resultado;
  }


  async signOut() {
    console.log("signOut");
    this.userRole.next(null);
    return await this._supabaseClient.auth.signOut();
  }

}
