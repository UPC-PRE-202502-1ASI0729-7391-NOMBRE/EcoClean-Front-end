import { Routes } from '@angular/router';
import { UserLayoutComponent } from './shared/presentation/components/user-layout/user-layout';
import { UserTrendingView } from './social/presentation/views/user-trending/user-trending';
import { UserMapView } from './operations/presentation/views/user-map/user-map';
import { UserMessagesView } from './communication/presentation/views/user-messages/user-messages';
import { UserJobRequestView } from './recruitment/presentation/views/user-job-request/user-job-request';

export const UserRoutes: Routes = [
  {
    path: 'user',
    component: UserLayoutComponent,
    children: [
      { path: 'trending', component: UserTrendingView },
      { path: 'map', component: UserMapView },
      { path: 'messages', component: UserMessagesView },
      { path: 'job-request', component: UserJobRequestView },
      { path: '', redirectTo: 'trending', pathMatch: 'full' }
    ]
  }
];
