import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }   from './components/login/login.component';
import { ProfileComponent }   from './components/profile/profile.component';
import { RegisterComponent }   from './components/register/register.component';
import { HomeComponent }   from './components/home/home.component';
import { LeaderboardComponent }   from './components/leaderboard/leaderboard.component';
import { StatsComponent } from './components/stats/stats.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StartComponent } from './components/start/start.component';
import { ArtistComponent } from './components/artist/artist.component';
import { RecentComponent } from './components/recent/recent.component';

const routes: Routes = [
  { path: '',  component: HomeComponent },
  { path: 'profile/:id',  component: ProfileComponent },
  { path: 'artist/:name', component: ArtistComponent },
  { path: 'register',  component: RegisterComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'board',  component: LeaderboardComponent },
  { path: 'stats',  component: StatsComponent },
  { path: 'settings',  component: SettingsComponent },
  { path: 'get-started', component: StartComponent },
  { path: 'recent', component: RecentComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
