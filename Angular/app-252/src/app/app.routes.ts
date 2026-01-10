import { Routes } from '@angular/router';
import { PersonGetall } from './pages/person/person-getall/person-getall';
import { PersonInsert } from './pages/person/person-insert/person-insert';
import { Home } from './pages/main/home/home';
import { Suma } from './suma/suma';

export const routes: Routes = [
    {path: '', component:Home},
    {path: 'person-getall', component: PersonGetall},
    {path: 'person-insert', component: PersonInsert},
    {path: 'suma', component: Suma},
];
