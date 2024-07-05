import { Routes } from '@angular/router';
import { PasswordListingComponent } from './password-listing/password-listing.component';
import { PasswordDetailsComponent } from './password-details/password-details.component';
import { UserConfigsComponent } from './user-configs/user-configs.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { authenticationGuard } from './authentication.guard';
import { InsertAccountComponent } from './insert-account/insert-account.component';

export const routes: Routes = [
    {path:'', redirectTo:'/user-login', pathMatch:'full'},
    {path:'psw-list', component: PasswordListingComponent},
    {path:'psw-details/{id}', component:PasswordDetailsComponent},
    {path:'user-configs', component:UserConfigsComponent,canActivate:[authenticationGuard]},
    {path:'insert-account', component:InsertAccountComponent},
    {path:'user-login', component:UserLoginComponent}
];
