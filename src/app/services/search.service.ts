import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProcessHttpmsgService } from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient,
    private ProcessHttpmsgService: ProcessHttpmsgService) { }
  
  searchUsers(query: string): Observable<any> {

    const headers = {
      'accept': 'application/vnd.github.v3+json'
    }
  
    return this.http.get<any>(`https://api.github.com/search/users?q=${query}`, {headers})
    .pipe(catchError(error => this.ProcessHttpmsgService.handleError(error)))
  }
}
