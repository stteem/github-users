import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-home',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  inputValue?: string;
  filteredOptions: string[] = [];
  options = ['stteem', 'john', 'Wallace'];
  
  count: any;
  page: number = 1;
  collection: Array<any> = []; 

  config: any;
  spin = true;
  searchErrMess = '';

  // Customize ngx-pagination
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
      previousLabel: 'Previous',
      nextLabel: 'Next',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page ${this.page}`
  };


  constructor(private searchservice: SearchService) { 
    this.filteredOptions = this.options;
  }

  pageChanged(event: any){
    this.config.currentPage = event;
  }

  ngOnInit(): void {
    this.config = {
      id: 'users',
      itemsPerPage: 5,
      currentPage: this.page,
      totalItems: this.count
    };
  }

  onChange(value: string): void {
    // Clear error messages each time
    this.searchErrMess = '';
    // Clear collection for better UX
    this.collection = [];
    this.spin = false;
    //this.inputValue = value;
    this.searchservice.searchUsers(value)
    .subscribe(res => {
      this.spin = true;
      console.log('res ',res)
      this.count = res.total_count;
      this.collection = res.items;
      // Once result is back, filter and populate search box  for future use
      const filtered = this.collection.filter(item => item.login.toLowerCase().indexOf(value.toLowerCase()) !== -1);
      this.filteredOptions = [];
      filtered.forEach(element => {
        this.filteredOptions.push(element.login)
      });
    },
    error => {
      console.log('search error ', error);
      this.searchErrMess = error;
    });
  }
}
