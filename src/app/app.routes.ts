import { Routes } from '@angular/router';
import { PasswordDetailsComponent } from './password-details/password-details.component';
import { UserConfigsComponent } from './user-configs/user-configs.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { authenticationGuard } from './authentication.guard';
import { InsertAccountComponent } from './insert-account/insert-account.component';
import { AccountsListingComponent } from './accounts-listing/accounts-listing.component';

export const routes: Routes = [
    {path:'', redirectTo:'/accounts-list', pathMatch:'full'},
    {path:'accounts-list', component: AccountsListingComponent},
    {path:'psw-details/{id}', component:PasswordDetailsComponent},
    {path:'user-configs', component:UserConfigsComponent,canActivate:[authenticationGuard]},
    {path:'insert-account', component:InsertAccountComponent},
    {path:'user-login', component:UserLoginComponent}
];
