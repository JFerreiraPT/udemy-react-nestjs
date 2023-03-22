export class PaginatedResult<T> {
  data: T[];
  meta: {
    page: number;
    last_page: number;
    total: number;
  };
}
