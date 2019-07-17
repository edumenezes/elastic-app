/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SearchEntityService } from 'app/entities/search-entity/search-entity.service';
import { ISearchEntity, SearchEntity } from 'app/shared/model/search-entity.model';

describe('Service Tests', () => {
  describe('SearchEntity Service', () => {
    let injector: TestBed;
    let service: SearchEntityService;
    let httpMock: HttpTestingController;
    let elemDefault: ISearchEntity;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(SearchEntityService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new SearchEntity(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        'AAAAAAA',
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        currentDate
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            sourceDate: currentDate.format(DATE_FORMAT),
            creationDate: currentDate.format(DATE_FORMAT),
            lastUpdate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a SearchEntity', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            sourceDate: currentDate.format(DATE_FORMAT),
            creationDate: currentDate.format(DATE_FORMAT),
            lastUpdate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            sourceDate: currentDate,
            creationDate: currentDate,
            lastUpdate: currentDate
          },
          returnedFromService
        );
        service
          .create(new SearchEntity(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a SearchEntity', async () => {
        const returnedFromService = Object.assign(
          {
            title: 'BBBBBB',
            link: 'BBBBBB',
            description: 'BBBBBB',
            tags: 'BBBBBB',
            searchString: 'BBBBBB',
            quantityClicks: 1,
            source: 'BBBBBB',
            sourceDate: currentDate.format(DATE_FORMAT),
            smalImage: 'BBBBBB',
            postedBy: 'BBBBBB',
            creationDate: currentDate.format(DATE_FORMAT),
            lastUpdate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            sourceDate: currentDate,
            creationDate: currentDate,
            lastUpdate: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of SearchEntity', async () => {
        const returnedFromService = Object.assign(
          {
            title: 'BBBBBB',
            link: 'BBBBBB',
            description: 'BBBBBB',
            tags: 'BBBBBB',
            searchString: 'BBBBBB',
            quantityClicks: 1,
            source: 'BBBBBB',
            sourceDate: currentDate.format(DATE_FORMAT),
            smalImage: 'BBBBBB',
            postedBy: 'BBBBBB',
            creationDate: currentDate.format(DATE_FORMAT),
            lastUpdate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            sourceDate: currentDate,
            creationDate: currentDate,
            lastUpdate: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a SearchEntity', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
