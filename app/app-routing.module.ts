import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'scan-code/:code', loadChildren: './pages/scan-code/scan-code.module#ScanCodePageModule' },
  { path: 'asset-info/:id/:code', loadChildren: './pages/asset-info/asset-info.module#AssetInfoPageModule' },
  { path: 'intervention/:code', loadChildren: './pages/intervention/intervention.module#InterventionPageModule' },
  { path: 'scancodeintervention', loadChildren: './pages/scancodeintervention/scancodeintervention.module#ScancodeinterventionPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
