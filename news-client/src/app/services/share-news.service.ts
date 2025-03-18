import {ElementRef, inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {firstValueFrom, Observable} from 'rxjs';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ShareNewsService {

  private http = inject(HttpClient)

  // Task 1
  uploadNews(imageFile:ElementRef, form: FormGroup){
    const values = form.value

    console.info(">>>Ref",imageFile.nativeElement.files[0])

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('photo', imageFile.nativeElement.files[0]);
    formData.append('description', values.description);
    formData.append('tags', values.tags);

    return firstValueFrom(this.http.post<any>('/api/news',formData));
  }


}
