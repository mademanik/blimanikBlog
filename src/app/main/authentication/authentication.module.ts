import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';

import { Login } from 'app/main/authentication/login/login.component';
import { Register } from 'app/main/authentication/register/register.component';
import { ForgotPassword } from 'app/main/authentication/forgot-password/forgot-password.component';

// routing
const routes: Routes = [
  {
    path: 'authentication/login',
    component: Login,
    data: { animation: 'auth' }
  },
  {
    path: 'authentication/register',
    component: Register,
    data: { animation: 'auth' }
  },
  {
    path: 'authentication/forgot-password',
    component: ForgotPassword,
    data: { animation: 'auth' }
  }
];

@NgModule({
  declarations: [Login, Register, ForgotPassword],
  imports: [CommonModule, RouterModule.forChild(routes), NgbModule, FormsModule, ReactiveFormsModule, CoreCommonModule]
})
export class AuthenticationModule {}
