import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseDetailComponent} from './dar/case-detail/case-detail.component';
import { WorkflowComponent } from './shared/workflow/workflow.component';
import { HomeComponent} from './shared/home/home.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';



const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch:'full'},
  {path:'home',component : HomeComponent },
  {path: 'casemanagement', component: CaseDetailComponent},
  {path: 'workflow', component:WorkflowComponent},
  {path:'**', component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
