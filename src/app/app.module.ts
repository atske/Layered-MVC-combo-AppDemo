import { UserService } from './services/user.service';
import { WordService } from './services/word.service';
import { DataTableModule } from 'angular5-data-table';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { NewwordComponent } from './newword/newword.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DictionaryComponent,
    NewwordComponent
  ],
  imports: [
    DataTableModule,
    FormsModule,
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'dictionary', component: DictionaryComponent },
      { path: 'newword', component: NewwordComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'login', component: LoginComponent}
    ])
  ],
  providers: [WordService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
