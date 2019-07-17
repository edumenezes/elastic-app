import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SearchEntity } from 'app/shared/model/search-entity.model';
import { SearchEntityService } from './search-entity.service';
import { SearchEntityComponent } from './search-entity.component';
import { SearchEntityDetailComponent } from './search-entity-detail.component';
import { SearchEntityUpdateComponent } from './search-entity-update.component';
import { SearchEntityDeletePopupComponent } from './search-entity-delete-dialog.component';
import { ISearchEntity } from 'app/shared/model/search-entity.model';

@Injectable({ providedIn: 'root' })
export class SearchEntityResolve implements Resolve<ISearchEntity> {
  constructor(private service: SearchEntityService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISearchEntity> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SearchEntity>) => response.ok),
        map((searchEntity: HttpResponse<SearchEntity>) => searchEntity.body)
      );
    }
    return of(new SearchEntity());
  }
}

export const searchEntityRoute: Routes = [
  {
    path: '',
    component: SearchEntityComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'elasticApp.searchEntity.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SearchEntityDetailComponent,
    resolve: {
      searchEntity: SearchEntityResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'elasticApp.searchEntity.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SearchEntityUpdateComponent,
    resolve: {
      searchEntity: SearchEntityResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'elasticApp.searchEntity.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SearchEntityUpdateComponent,
    resolve: {
      searchEntity: SearchEntityResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'elasticApp.searchEntity.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const searchEntityPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SearchEntityDeletePopupComponent,
    resolve: {
      searchEntity: SearchEntityResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'elasticApp.searchEntity.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
