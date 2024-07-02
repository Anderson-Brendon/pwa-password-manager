import { Routes } from '@angular/router';
import { PasswordListingComponent } from './password-listing/password-listing.component';
import { PasswordDetailsComponent } from './password-details/password-details.component';
import { UserConfigsComponent } from './user-configs/user-configs.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { authenticationGuard } from './authentication.guard';

export const routes: Routes = [
    {path:'psw-list', component: PasswordListingComponent},
    {path:'psw-details/{id}', component:PasswordDetailsComponent},
    {path:'user-configs', component:UserConfigsComponent,canActivate:[authenticationGuard]},
    {path:'create-psw', component:CreatePasswordComponent},
    {path:'', component:UserLoginComponent}
];
