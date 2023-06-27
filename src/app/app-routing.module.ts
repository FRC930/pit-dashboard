import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event/event.component';
import { DiagnosticComponent } from './diagnostic/diagnostic.component';

const routes: Routes = [
  { path: '', component: EventComponent },
  { path: 'diagnostics', component: DiagnosticComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
