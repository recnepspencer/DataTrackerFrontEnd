import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private uri = 'user/data';

  constructor(private crudService: CrudService) {}

  createUserWeight(data: any): Observable<any> {
    return this.crudService.create(data, this.uri);
  }

  readUserData(): Observable<any> {
    return this.crudService.index(this.uri);
  }

  showUserData(id: number): Observable<any> {
    return this.crudService.show(id, this.uri);
  }

  updateUserGender(id: number, gender: 'm' | 'f'): Observable<any> {
    return this.crudService.update(id, { gender }, this.uri);
  }

  updateUserWeight(newWeight: number): Observable<any> {
    return this.crudService.update(1, { weight: newWeight }, this.uri);
  }

  deleteUserData(id: number): Observable<any> {
    return this.crudService.delete(id, this.uri);
  }
}
