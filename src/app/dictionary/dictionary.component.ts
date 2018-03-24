
import { DataTableResource } from 'angular5-data-table';
import { Component, OnInit } from '@angular/core';
import { WordService } from '../services/word.service';
import { AngWords } from '../models/angwords';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css'],
  providers: [WordService]
})
export class DictionaryComponent implements OnInit {

  words: Array<AngWords>;
  filteredWords: Array<AngWords>;
  tableResource: DataTableResource<AngWords>;
  items: Array<AngWords>;
  itemCount: number;

  constructor(private _wordService: WordService) { }

  ngOnInit() {
    this._wordService.getWords()
      .subscribe(resWordData => { this.filteredWords = this.words = resWordData;
        this.initializeTable(resWordData);
      });
  }


  private initializeTable(resWordData: Array<AngWords>) {
    this.tableResource = new DataTableResource(resWordData);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.tableResource) { return; }
    this.tableResource.query(params)
      .then(items => this.items = items);
  }

  filter(query: String) {
    this.filteredWords = (query) ?
      this.words.filter(searched => searched.word.toLowerCase().includes(query.toLowerCase())) :
      this.words;
    this.initializeTable(this.filteredWords);
  }

}
