import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos:any[]=[]

  constructor() { }

  getTodos(): Observable<any[]> {
    // Emit the todos array as an observable
    return of(this.todos);
  }

  saveTodos(todoss: any[]): Observable<any[]> {
    // Use `tap` to update the internal `todos` array and emit it as an observable
    return of(todoss).pipe(
      tap((todos) => this.todos = todos)
    );
  }
}
