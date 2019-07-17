import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISearchEntity } from 'app/shared/model/search-entity.model';
import { AccountService } from 'app/core';
import { SearchEntityService } from './search-entity.service';

@Component({
  selector: 'jhi-search-entity',
  templateUrl: './search-entity.component.html'
})
export class SearchEntityComponent implements OnInit, OnDestroy {
  searchEntities: ISearchEntity[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected searchEntityService: SearchEntityService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.searchEntityService
      .query()
      .pipe(
        filter((res: HttpResponse<ISearchEntity[]>) => res.ok),
        map((res: HttpResponse<ISearchEntity[]>) => res.body)
      )
      .subscribe(
        (res: ISearchEntity[]) => {
          this.searchEntities = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSearchEntities();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISearchEntity) {
    return item.id;
  }

  registerChangeInSearchEntities() {
    this.eventSubscriber = this.eventManager.subscribe('searchEntityListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
