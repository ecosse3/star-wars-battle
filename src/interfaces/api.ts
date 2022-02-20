export interface IResponse<T> {
  count: number;
  next: string;
  previous: string | null;
  results: T;
}
