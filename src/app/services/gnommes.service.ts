import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GnommesService {

  private GNOMME_DATA = 'https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json';

  constructor(private httpClient: HttpClient) { }

  public fetchData(): Observable<any> {
    return this.httpClient.get(this.GNOMME_DATA);
  }
}
