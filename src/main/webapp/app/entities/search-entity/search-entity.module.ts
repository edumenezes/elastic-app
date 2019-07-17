import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ElasticAppSharedModule } from 'app/shared';
import {
  SearchEntityComponent,
  SearchEntityDetailComponent,
  SearchEntityUpdateComponent,
  SearchEntityDeletePopupComponent,
  SearchEntityDeleteDialogComponent,
  searchEntityRoute,
  searchEntityPopupRoute
} from './';

const ENTITY_STATES = [...searchEntityRoute, ...searchEntityPopupRoute];

@NgModule({
  imports: [ElasticAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SearchEntityComponent,
    SearchEntityDetailComponent,
    SearchEntityUpdateComponent,
    SearchEntityDeleteDialogComponent,
    SearchEntityDeletePopupComponent
  ],
  entryComponents: [
    SearchEntityComponent,
    SearchEntityUpdateComponent,
    SearchEntityDeleteDialogComponent,
    SearchEntityDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ElasticAppSearchEntityModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
