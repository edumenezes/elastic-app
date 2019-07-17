/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ElasticAppTestModule } from '../../../test.module';
import { SearchEntityDeleteDialogComponent } from 'app/entities/search-entity/search-entity-delete-dialog.component';
import { SearchEntityService } from 'app/entities/search-entity/search-entity.service';

describe('Component Tests', () => {
  describe('SearchEntity Management Delete Component', () => {
    let comp: SearchEntityDeleteDialogComponent;
    let fixture: ComponentFixture<SearchEntityDeleteDialogComponent>;
    let service: SearchEntityService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ElasticAppTestModule],
        declarations: [SearchEntityDeleteDialogComponent]
      })
        .overrideTemplate(SearchEntityDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SearchEntityDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SearchEntityService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
