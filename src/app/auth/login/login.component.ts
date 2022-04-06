import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import { Usuario } from 'src/app/models/user';
import { setUser } from '../auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  uiSubscription: Subscription;
  userSubscription: Subscription;
  loading: boolean = false;
  currentUser: Usuario;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe((ui) => {
      this.loading = ui.isLoading;
    });

    this.userSubscription = this.store.select('user').subscribe((user) => {
      this.currentUser = user.usuario;
    });
  }
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
  loginUsuario() {
    this.store.dispatch(isLoading());

    this.auth
      .loginUsuario(
        this.form.get('correo')?.value,
        this.form.get('password')?.value
      )
      .then((res) => {
        console.log(res);
        //this.store.dispatch(setUser(new Usuario(res.user.uid, res.user)))
        this.store.dispatch(stopLoading());
        this.router.navigate(['']);
      })
      .catch((e) => {
        this.store.dispatch(stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: e.message,
        });
      });
  }
}
