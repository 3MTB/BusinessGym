import {Injectable} from '@angular/core';
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {environment} from '../../environments/environment';


@Injectable({providedIn: 'root'})
export class SupaReal {
  readonly supabase! : SupabaseClient;
    constructor() {
      this.supabase =createClient(environment.SUPABASE_URL,environment.SUPABASE_APIKEY);
    }

    getSupabase() {
      return this.supabase;
    }

}
