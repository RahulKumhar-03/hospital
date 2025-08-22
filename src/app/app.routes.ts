import { Routes } from '@angular/router';
import { AllPhysicianComponent } from './components/physician/all-physician/all-physician.component';
import { AllNurseComponent } from './components/nurse/all-nurse/all-nurse.component';

export const routes: Routes = [
    {path: 'physician', component: AllPhysicianComponent},
    {path: 'nurse', component: AllNurseComponent}
];
