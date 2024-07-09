import { Routes } from '@angular/router';
import { UserConfigsComponent } from './user-configs/user-configs.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { authenticationGuard } from './authentication.guard';
import { InsertAccountComponent } from './insert-account/insert-account.component';
import { AccountsListingComponent } from './accounts-listing/accounts-listing.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { PswMakerComponent } from './psw-maker/psw-maker.component';


export const routes: Routes = [
    {path:'', redirectTo:'/user-login', pathMatch:'full'},
    {path:'accounts-list', component: AccountsListingComponent, canActivate:[authenticationGuard], data:{animation: 'AccountsListing'}},
    {path:'user-configs', component:UserConfigsComponent,canActivate:[authenticationGuard], data:{animation: 'UserConfigs'}},
    {path:'insert-account', component:InsertAccountComponent, canActivate:[authenticationGuard], data:{animation: 'InsertAccount'}},
    {path:'user-login', component:UserLoginComponent, data:{animation: 'UserLogin'}},
    {path:'edit-account/:id', component:EditAccountComponent, canActivate:[authenticationGuard], data:{animation: 'EditAccount'}},
    {path:'password-maker', component: PswMakerComponent, canActivate:[authenticationGuard], data:{animation: 'PswMaker'}}
];
