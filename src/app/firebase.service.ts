import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private db: AngularFireDatabase) {}

  getItems(): Observable<any[]> {
    return this.db.list('/items').valueChanges();
  }

  addItem(item: any): void {
    this.db.list('/items').push(item);
  }

  updateItem(key: string, item: any): void {
    this.db.list('/items').update(key, item);
  }

  deleteItem(key: string): void {
    this.db.list('/items').remove(key);
  }
}
