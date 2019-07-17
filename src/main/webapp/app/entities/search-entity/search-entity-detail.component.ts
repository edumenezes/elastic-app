import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISearchEntity } from 'app/shared/model/search-entity.model';

@Component({
  selector: 'jhi-search-entity-detail',
  templateUrl: './search-entity-detail.component.html'
})
export class SearchEntityDetailComponent implements OnInit {
  searchEntity: ISearchEntity;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ searchEntity }) => {
      this.searchEntity = searchEntity;
    });
  }

  previousState() {
    window.history.back();
  }
}
