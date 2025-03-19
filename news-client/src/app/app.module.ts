import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ShareNewsComponent } from './components/share-news/share-news.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import {RouterModule, RouterOutlet, Routes} from '@angular/router';
import {provideHttpClient} from '@angular/common/http';

const appRoutes: Routes = [
  // View 0: Search tags
  { path: '', component:LandingPageComponent},
  // View 1: News List
  { path: 'news', component: NewsListComponent},
  // View 2: Share News
  { path: 'post', component: ShareNewsComponent},
  // wild card must be the last route
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    ShareNewsComponent,
    LandingPageComponent,
    NewsListComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, RouterOutlet,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
