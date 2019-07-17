import { Moment } from 'moment';

export interface ISearchEntity {
  id?: number;
  title?: string;
  link?: string;
  description?: string;
  tags?: string;
  searchString?: string;
  quantityClicks?: number;
  source?: string;
  sourceDate?: Moment;
  smalImage?: string;
  postedBy?: string;
  creationDate?: Moment;
  lastUpdate?: Moment;
}

export class SearchEntity implements ISearchEntity {
  constructor(
    public id?: number,
    public title?: string,
    public link?: string,
    public description?: string,
    public tags?: string,
    public searchString?: string,
    public quantityClicks?: number,
    public source?: string,
    public sourceDate?: Moment,
    public smalImage?: string,
    public postedBy?: string,
    public creationDate?: Moment,
    public lastUpdate?: Moment
  ) {}
}
