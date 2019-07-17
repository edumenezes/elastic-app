/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ElasticAppTestModule } from '../../../test.module';
import { SearchEntityComponent } from 'app/entities/search-entity/search-entity.component';
import { SearchEntityService } from 'app/entities/search-entity/search-entity.service';
import { SearchEntity } from 'app/shared/model/search-entity.model';

describe('Component Tests', () => {
  describe('SearchEntity Management Component', () => {
    let comp: SearchEntityComponent;
    let fixture: ComponentFixture<SearchEntityComponent>;
    let service: SearchEntityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ElasticAppTestModule],
        declarations: [SearchEntityComponent],
        providers: []
      })
        .overrideTemplate(SearchEntityComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SearchEntityComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SearchEntityService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SearchEntity(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.searchEntities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
