import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = "http://localhost:1337/"

  constructor() { }
}
