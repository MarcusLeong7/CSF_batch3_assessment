import {Component, inject, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {TimeEvent} from '../../models/news';
import {ActivatedRoute, Router} from '@angular/router';
import {ShareNewsService} from '../../services/share-news.service';
import {TagCount} from '../../models/tag-count';

@Component({
  selector: 'app-landing-page',
  standalone: false,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  // Dependency Injections
  private newsSvc = inject(ShareNewsService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  time !:number[]
  selectedTime!: number;
  tags!: TagCount[];


  ngOnInit() {
    this.time = [5, 15, 30, 45, 60];
    this.selectedTime = Number(this.activatedRoute.snapshot.queryParamMap.get("time"));
    this.getTags(this.selectedTime || 5);
  }


  onTimeSelect(event: any) {
    this.getTags(event.target.value);
    this.router.navigate([], {
      queryParams: { time: event.target.value }
    })
  }
}
