import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {catchError, concat, debounceTime, distinctUntilChanged, filter, of, Subject, switchMap, tap} from 'rxjs';
import {Movie} from "../interfaces/movie.interface";

@Component({
  selector: 'custom-form',
  templateUrl: './custom-form.component.html',
})
export class CustomFormComponent {
  movies$!: any;
  moviesInput$ = new Subject<string>();
  movies!: Array<Movie>;
  moviesLoading: any;
  movieList = [
    {
      id: 1,
      title: 'Lord of the rings'
    },
    {
      id: 2,
      title: 'Benjamin Button'
    }
  ]

  constructor(private fb: FormBuilder) {}

  form = this.fb.group({
    message: [''],
    movie: [''],
  });

  loadMovies() {
    const defaultValue = this.form.value.movie ? this.form.value.movie : '';
    this.movies$ = concat(
      of([defaultValue]),
      this.moviesInput$.pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => this.moviesLoading = true),
        switchMap((term) => this.searchMovie(term).pipe(
          catchError(() => of([])),
          tap(() => this.moviesLoading = false)
        ))
      )
    );
  }

  searchMovie(term: string){
    const result = this.movieList.find(movie => {
      const reg = new RegExp(term, 'gi');
      return movie.title.match(reg);
    } );
    console.log('searchResult', result);
    return of([result]);
  }

  submitForm(){
    console.log('submitted');
  }
}
