import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ElasticAppSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [ElasticAppSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [ElasticAppSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ElasticAppSharedModule {
  static forRoot() {
    return {
      ngModule: ElasticAppSharedModule
    };
  }
}
