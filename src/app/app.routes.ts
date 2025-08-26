import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'physician', loadComponent: () => import('./components/physician/all-physician/all-physician.component').then(m => m.AllPhysicianComponent)
    },
    {
        path: 'nurse',  loadComponent: () => import('./components/nurse/all-nurse/all-nurse.component').then(m => m.AllNurseComponent)
    },
    {
        path: 'procedure', loadComponent:()=> import('./components/procedures/all-procedure/all-procedure.component').then(m => m.AllProcedureComponent)
    },
    {
        path: 'rooms', loadComponent:()=> import('./components/rooms/all-rooms/all-rooms.component').then(m => m.AllRoomsComponent)
    },
    {
        path: 'block', loadComponent:()=> import('./components/blocks/all-block/all-block.component').then(m => m.AllBlockComponent)
    },
    {
        path: 'on-call', loadComponent:()=> import('./components/on-call/all-on-calls/all-on-calls.component').then(m => m.AllOnCallsComponent)
    },
    {
        path: 'patient', loadComponent:()=> import('./components/patients/all-patient/all-patient.component').then(m => m.AllPatientComponent)
    },
];
