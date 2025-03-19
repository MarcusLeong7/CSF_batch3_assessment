import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShareNewsService} from '../../services/share-news.service';
import {TagCount} from '../../models/tag-count';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-landing-page',
  standalone: false,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit ,OnDestroy {

  // Dependency Injections
  private newsSvc = inject(ShareNewsService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  time !:number[]
  selectedTime!: number;
  tags!: TagCount[];

  getTagsSub$ !: Subscription;


  ngOnInit() {
    this.time = [5, 15, 30, 45, 60];
    this.selectedTime = Number(this.activatedRoute.snapshot.queryParamMap.get("time"));
    this.getTags(this.selectedTime || 5);
  }

  getTags(timeInMinutes: number) {
    this.selectedTime = timeInMinutes;
    this.getTagsSub$ = this.newsSvc.getTags(timeInMinutes)
      .subscribe({
        next: tags => this.tags = tags,
        error: err => console.error(err.message)
      })
  }

  onTimeSelect(event: any) {
    this.getTags(event.target.value);
    this.router.navigate([], {
      queryParams: { time: event.target.value }
    })
  }

  ngOnDestroy() {
    this.getTagsSub$.unsubscribe();
  }
}
