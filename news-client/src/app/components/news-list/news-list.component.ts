import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShareNewsService} from '../../services/share-news.service';
import {News} from '../../models/news';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-news-list',
  standalone: false,
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css'
})
export class NewsListComponent implements OnInit,OnDestroy {

  // Dependency Injections
  private activatedRoute = inject(ActivatedRoute);
  private newsSvc = inject(ShareNewsService);

  tag= ""
  time!: number;
  newsList: News[] = [];
  getNewsSub$ !: Subscription;

  ngOnInit() {
    this.tag = this.activatedRoute.snapshot.paramMap.get("tag")!;
    this.time = Number(this.activatedRoute.snapshot.queryParamMap.get("time"));
    this.getNewsSub$ = this.newsSvc.getNews(this.tag, this.time)
        .subscribe({
          next: news => this.newsList = news,
          error: err => console.error(err.message)
        })
  }

  ngOnDestroy() {
    this.getNewsSub$.unsubscribe();
  }


}
