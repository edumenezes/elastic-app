/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ElasticAppTestModule } from '../../../test.module';
import { SearchEntityDetailComponent } from 'app/entities/search-entity/search-entity-detail.component';
import { SearchEntity } from 'app/shared/model/search-entity.model';

describe('Component Tests', () => {
  describe('SearchEntity Management Detail Component', () => {
    let comp: SearchEntityDetailComponent;
    let fixture: ComponentFixture<SearchEntityDetailComponent>;
    const route = ({ data: of({ searchEntity: new SearchEntity(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ElasticAppTestModule],
        declarations: [SearchEntityDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SearchEntityDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SearchEntityDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.searchEntity).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
