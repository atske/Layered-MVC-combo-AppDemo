import { WordService } from './../services/word.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngWords } from '../models/angwords';

@Component({
  selector: 'app-newword',
  templateUrl: './newword.component.html',
  styleUrls: ['./newword.component.css']
})
export class NewwordComponent implements OnInit {

  words: Array<AngWords> = [];

  constructor(private _wordService: WordService, private _router: Router) { }

  saveProduct(word: AngWords) {
    this._wordService.addWord(word)
    .subscribe(resNewWords => {
      this.words.push(resNewWords);
      this._router.navigate(['/dictionary']);
    });
  }

  ngOnInit() {
  }

}
