import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { unSetUser } from 'src/app/auth/auth.actions';
import { unSetItems } from 'src/app/ingreso-egreso/ingreso-egreso.actions';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit, OnDestroy {
  name: string = '';
  userSub: Subscription;
  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select('user')
      .subscribe(({ usuario }) => (this.name = usuario?.nombre));
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  logOut() {
    this.auth.logOut().then(() => {
      this.store.dispatch(unSetItems());
      this.store.dispatch(unSetUser());
      this.router.navigate(['/login']);
    });
  }
}
