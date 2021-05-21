import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProcessHttpmsgService {
  constructor() { }

  public handleError(error: HttpErrorResponse | any) {
    let errMsg: string;

    if (error.error instanceof ErrorEvent) {
      errMsg = error.error.message;
    }
    if (error.status == 403) {
      errMsg = error.message;
    }
    if (error.status == 404) {
      errMsg = 'Nothing was found';
    }
    if (error.status == 500) {
      errMsg = `Something went wrong, an ${error.statusText}, please try again.`;
    }
    if (error.status == 0) {
      errMsg = 'No internet connection, connect to the internet and try again.';
    }

    errMsg = 'Something went wrong, please try again.';

    return throwError(errMsg);
  }
}
