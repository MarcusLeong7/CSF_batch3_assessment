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
  fileInput !: ElementRef;

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
      tags: this.fb.control<string>(''),
    })
  }


  processForm() {
    if (!this.fileInput) {
      alert('Please select an image before submitting.');
      return;
    }
    // Assign the tags array to the form value before submission
    const formCopy = this.form.value;
    formCopy.tags = this.tags;
    // Create a new FormGroup with the updated values
    const updatedForm = this.fb.group(formCopy);

    this.newsSvc.uploadNews(this.fileInput, updatedForm)
      .then(resp => {
        console.log(resp);
        alert('ALERT! Your news ID is: ' + resp.newsId);
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error('Error uploading news:', error);
        alert('Failed to upload news');
      });

    this.form = this.createForm();// Reset form
    this.tags = []; // Clear the tags array

    // Reset the file input
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  addTag() {
    const tagInput = this.form.get('tags');

    // Ensure that there is no null value
    if (tagInput && tagInput.value) {
      const tagValue = tagInput.value.trim();
      if (tagValue) {
        // Add the tag to the array
        this.tags.push(tagValue);
        // Clear the input field
        tagInput.setValue('');
      }
    }
  }

  deleteTag(index: number) {
    this.tags.splice(index, 1);
  }



}
