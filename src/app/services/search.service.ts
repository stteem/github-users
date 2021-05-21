/* eslint-disable no-shadow */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { catchError } from 'rxjs/operators';
// eslint-disable-next-line import/no-unresolved
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root',
})
// eslint-disable-next-line import/prefer-default-export
export class SearchService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private http: HttpClient,
    private ProcessHttpmsgService: ProcessHttpmsgService
  ) { }

  searchUsers(query: string): Observable<any> {
    const headers = {
      accept: 'application/vnd.github.v3+json',
    };

    return this.http.get<any>(`https://api.github.com/search/users?q=${query}`, { headers })
      .pipe(catchError((error) => this.ProcessHttpmsgService.handleError(error)));
  }
}
