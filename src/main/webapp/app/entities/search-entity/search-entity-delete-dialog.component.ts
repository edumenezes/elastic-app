import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISearchEntity } from 'app/shared/model/search-entity.model';
import { SearchEntityService } from './search-entity.service';

@Component({
  selector: 'jhi-search-entity-delete-dialog',
  templateUrl: './search-entity-delete-dialog.component.html'
})
export class SearchEntityDeleteDialogComponent {
  searchEntity: ISearchEntity;

  constructor(
    protected searchEntityService: SearchEntityService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.searchEntityService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'searchEntityListModification',
        content: 'Deleted an searchEntity'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-search-entity-delete-popup',
  template: ''
})
export class SearchEntityDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ searchEntity }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SearchEntityDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.searchEntity = searchEntity;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/search-entity', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/search-entity', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
