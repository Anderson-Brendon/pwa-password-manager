import { Routes } from '@angular/router';
import { PasswordDetailsComponent } from './password-details/password-details.component';
import { UserConfigsComponent } from './user-configs/user-configs.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { authenticationGuard } from './authentication.guard';
import { InsertAccountComponent } from './insert-account/insert-account.component';
import { AccountsListingComponent } from './accounts-listing/accounts-listing.component';
import { EditAccountComponent } from './edit-account/edit-account.component';

export const routes: Routes = [
    {path:'', redirectTo:'/user-login', pathMatch:'full'},
    {path:'accounts-list', component: AccountsListingComponent, canActivate:[authenticationGuard]},
    {path:'user-configs', component:UserConfigsComponent,canActivate:[authenticationGuard]},
    {path:'insert-account', component:InsertAccountComponent, canActivate:[authenticationGuard]},
    {path:'user-login', component:UserLoginComponent},
    {path:'edit-account/:id', component:EditAccountComponent, canActivate:[authenticationGuard]}
];
