import {ElementRef, inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {firstValueFrom, Observable} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {TagCount} from '../models/tag-count';
import {News} from '../models/news';

@Injectable({
  providedIn: 'root'
})
export class ShareNewsService {

  private http = inject(HttpClient)

  // Task 1
  uploadNews(imageFile:ElementRef, form: FormGroup){
    const values = form.value

    console.info(">>>Title",values.title)
    console.info(">>>Ref",imageFile.nativeElement.files[0])
    console.info(">>>Description",values.description)
    console.info(">>>Array",values.tags)

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('photo', imageFile.nativeElement.files[0]);
    formData.append('description', values.description);
    formData.append('tags', values.tags);

    return firstValueFrom(this.http.post<any>('/api/news',formData));
  }

  // Task 2
  public getTags(timeInMinutes: number): Observable<TagCount[]> {
    return this.http.get<TagCount[]>('api/tags', {
      params: { time: timeInMinutes.toString() }
    });
  }

  // Task 3
  public getNews(tag:string,timeInMinutes: number): Observable<News[]> {
    const params = new HttpParams()
      .set('time', timeInMinutes.toString())
      .set('tag', tag);

    return this.http.get<News[]>('api/list', {params});
  }

}
