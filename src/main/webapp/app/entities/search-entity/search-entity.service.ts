import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISearchEntity } from 'app/shared/model/search-entity.model';

type EntityResponseType = HttpResponse<ISearchEntity>;
type EntityArrayResponseType = HttpResponse<ISearchEntity[]>;

@Injectable({ providedIn: 'root' })
export class SearchEntityService {
  public resourceUrl = SERVER_API_URL + 'api/search-entities';

  constructor(protected http: HttpClient) {}

  create(searchEntity: ISearchEntity): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(searchEntity);
    return this.http
      .post<ISearchEntity>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(searchEntity: ISearchEntity): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(searchEntity);
    return this.http
      .put<ISearchEntity>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISearchEntity>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISearchEntity[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(searchEntity: ISearchEntity): ISearchEntity {
    const copy: ISearchEntity = Object.assign({}, searchEntity, {
      sourceDate: searchEntity.sourceDate != null && searchEntity.sourceDate.isValid() ? searchEntity.sourceDate.format(DATE_FORMAT) : null,
      creationDate:
        searchEntity.creationDate != null && searchEntity.creationDate.isValid() ? searchEntity.creationDate.format(DATE_FORMAT) : null,
      lastUpdate: searchEntity.lastUpdate != null && searchEntity.lastUpdate.isValid() ? searchEntity.lastUpdate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.sourceDate = res.body.sourceDate != null ? moment(res.body.sourceDate) : null;
      res.body.creationDate = res.body.creationDate != null ? moment(res.body.creationDate) : null;
      res.body.lastUpdate = res.body.lastUpdate != null ? moment(res.body.lastUpdate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((searchEntity: ISearchEntity) => {
        searchEntity.sourceDate = searchEntity.sourceDate != null ? moment(searchEntity.sourceDate) : null;
        searchEntity.creationDate = searchEntity.creationDate != null ? moment(searchEntity.creationDate) : null;
        searchEntity.lastUpdate = searchEntity.lastUpdate != null ? moment(searchEntity.lastUpdate) : null;
      });
    }
    return res;
  }
}
