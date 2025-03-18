import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ShareNewsService} from '../../services/share-news.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-share-news',
  standalone: false,
  templateUrl: './share-news.component.html',
  styleUrl: './share-news.component.css'
})
export class ShareNewsComponent implements OnInit {

  private fb = inject(FormBuilder);
  private newsSvc = inject(ShareNewsService);
  private router = inject(Router);

  // Properties
  protected form !: FormGroup;

  @ViewChild('file')
  imageFile !: ElementRef;

  // Initialize as an empty array to ensure it's iterable
  tags: string[] = [];

  ngOnInit() {
    this.form = this.createForm();
  }

  private createForm() {
    return this.fb.group({
      title: this.fb.control<string>('', [Validators.required,Validators.minLength(5)]),
      photo: this.fb.control('', Validators.required),
      description: this.fb.control<string>('', [Validators.required,Validators.minLength(5)]),
      tags: this.fb.control<string>('', [Validators.required]),
    })
  }


  processForm() {
    if (!this.imageFile) {
      alert('Please select an image before submitting.');
      return;
    }
    this.newsSvc.uploadNews(this.imageFile, this.form)
      .then(resp => {
        console.log(resp);
        alert('ALERT! Your news ID is: ' + resp.newsId);
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error('Error uploading news:', error);
        alert('Failed to upload news');
      });
    this.form = this.createForm();
  }

  addTag() {
    const tagInput = this.form.get('tags')?.value;
    if (tagInput && tagInput.trim()) {
      const tagsToAdd = tagInput.trim().split(" ");
      for (const tag of tagsToAdd) {
        if (tag && !this.tags.includes(tag)) {
          this.tags.push(tag);
        }
      }
      // Optionally clear the input field after adding
      this.form.get('tags')?.setValue('');
    }
  }
  deleteTag(index: number) {
    this.tags.splice(index, 1);
  }



}
