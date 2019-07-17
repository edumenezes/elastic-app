/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ElasticAppTestModule } from '../../../test.module';
import { SearchEntityUpdateComponent } from 'app/entities/search-entity/search-entity-update.component';
import { SearchEntityService } from 'app/entities/search-entity/search-entity.service';
import { SearchEntity } from 'app/shared/model/search-entity.model';

describe('Component Tests', () => {
  describe('SearchEntity Management Update Component', () => {
    let comp: SearchEntityUpdateComponent;
    let fixture: ComponentFixture<SearchEntityUpdateComponent>;
    let service: SearchEntityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ElasticAppTestModule],
        declarations: [SearchEntityUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SearchEntityUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SearchEntityUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SearchEntityService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SearchEntity(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new SearchEntity();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
