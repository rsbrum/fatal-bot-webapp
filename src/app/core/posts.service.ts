import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { balancePreviousStylesIntoKeyframes } from '@angular/animations/browser/src/util';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  apiUrl = environment.API_URL
  
  constructor(private http: HttpClient) { }
  
  //check post

  postPost(postLink, nCurtidas) {
    var json: any  = {
      'postLink' : postLink,
      'nCurtidas' : nCurtidas
    }
    return this.http.post(this.apiUrl + 'posts/', json)
  }

}
