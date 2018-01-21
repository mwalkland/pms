import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { TitleComponent } from './title/title.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FooterComponent,
    TitleComponent
  ],
  declarations: [
    FooterComponent,
    TitleComponent
]
})
export class CoreModule { }