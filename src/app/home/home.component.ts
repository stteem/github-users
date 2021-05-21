import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// eslint-disable-next-line import/no-unresolved
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-home',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
// eslint-disable-next-line import/prefer-default-export
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
    screenReaderCurrentLabel: `You're on page ${this.page}`,
  };

  // eslint-disable-next-line no-unused-vars
  constructor(private searchservice: SearchService) {
    this.filteredOptions = this.options;
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  ngOnInit(): void {
    this.config = {
      id: 'users',
      itemsPerPage: 5,
      currentPage: this.page,
      totalItems: this.count,
    };
  }

  onChange(value: string): void {
    // Clear error messages each time
    this.searchErrMess = '';

    // Clear collection for better UX
    this.collection = [];
    this.spin = false;

    this.searchservice.searchUsers(value)
      .subscribe((res) => {
      // console.log('res ',res)
        this.spin = true;
        this.count = res.total_count;
        this.collection = res.items;

        // Once result is back, filter and populate search box  for future use
        // eslint-disable-next-line max-len
        const filtered = this.collection.filter((item) => item.login.toLowerCase().indexOf(value.toLowerCase()) !== -1);
        this.filteredOptions = [];
        filtered.forEach((element) => {
          this.filteredOptions.push(element.login);
        });
      },
      (error) => {
        this.searchErrMess = error;
      });
  }
}
