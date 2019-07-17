import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { ISearchEntity, SearchEntity } from 'app/shared/model/search-entity.model';
import { SearchEntityService } from './search-entity.service';

@Component({
  selector: 'jhi-search-entity-update',
  templateUrl: './search-entity-update.component.html'
})
export class SearchEntityUpdateComponent implements OnInit {
  isSaving: boolean;
  sourceDateDp: any;
  creationDateDp: any;
  lastUpdateDp: any;

  editForm = this.fb.group({
    id: [],
    title: [],
    link: [],
    description: [],
    tags: [],
    searchString: [],
    quantityClicks: [],
    source: [],
    sourceDate: [],
    smalImage: [],
    postedBy: [],
    creationDate: [],
    lastUpdate: []
  });

  constructor(protected searchEntityService: SearchEntityService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ searchEntity }) => {
      this.updateForm(searchEntity);
    });
  }

  updateForm(searchEntity: ISearchEntity) {
    this.editForm.patchValue({
      id: searchEntity.id,
      title: searchEntity.title,
      link: searchEntity.link,
      description: searchEntity.description,
      tags: searchEntity.tags,
      searchString: searchEntity.searchString,
      quantityClicks: searchEntity.quantityClicks,
      source: searchEntity.source,
      sourceDate: searchEntity.sourceDate,
      smalImage: searchEntity.smalImage,
      postedBy: searchEntity.postedBy,
      creationDate: searchEntity.creationDate,
      lastUpdate: searchEntity.lastUpdate
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const searchEntity = this.createFromForm();
    if (searchEntity.id !== undefined) {
      this.subscribeToSaveResponse(this.searchEntityService.update(searchEntity));
    } else {
      this.subscribeToSaveResponse(this.searchEntityService.create(searchEntity));
    }
  }

  private createFromForm(): ISearchEntity {
    return {
      ...new SearchEntity(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      link: this.editForm.get(['link']).value,
      description: this.editForm.get(['description']).value,
      tags: this.editForm.get(['tags']).value,
      searchString: this.editForm.get(['searchString']).value,
      quantityClicks: this.editForm.get(['quantityClicks']).value,
      source: this.editForm.get(['source']).value,
      sourceDate: this.editForm.get(['sourceDate']).value,
      smalImage: this.editForm.get(['smalImage']).value,
      postedBy: this.editForm.get(['postedBy']).value,
      creationDate: this.editForm.get(['creationDate']).value,
      lastUpdate: this.editForm.get(['lastUpdate']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISearchEntity>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
