import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ChannelsComponent} from './channels/channels.component';
import {ChannelComponent} from './channel/channel.component';
import {AuthGuard} from './_guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'channels', component: ChannelsComponent, canActivate: [AuthGuard] },
  { path: 'channel', component: ChannelComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: 'channels' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
