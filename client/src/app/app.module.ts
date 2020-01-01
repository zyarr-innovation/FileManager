import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatCardModule, 
         MatButtonModule,
         MatTooltipModule,
         MatToolbarModule,
         MatIconModule  } from '@angular/material';

import {FlexLayoutModule}  from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { AppFileNotFoundComponent } from './app.FileNFound';
import { FolderComponent } from 'src/folder/app.folder.component';
import {FolderService } from '../folder/app.folder.service';


const routes: Routes = [
  { path: '', component: FolderComponent },
  { path: '**', component: AppFileNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    FolderComponent,
    AppFileNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatToolbarModule,
    MatIconModule ,
    FontAwesomeModule,
    RouterModule.forRoot(routes)
  ],  
  providers: [FolderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
