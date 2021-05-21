import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NgxPaginationModule } from 'ngx-pagination';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Users } from '../shared/users';
import { HomeComponent } from './home.component';
import { SearchService } from '../services/search.service';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map((key) => antDesignIcons[key]);

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let de: DebugElement; (2);
  let el: HTMLElement;

  beforeEach(async () => {
    const searchServiceStub = {
      searchUsers(): Observable<any> {
        console.log('stub called');
        return of(Users);
      },
    };

    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule,
        NzSpinModule, NgxPaginationModule,
        HttpClientModule, FormsModule,
        NzAvatarModule, NzAutocompleteModule,
        NzInputModule, NzLayoutModule,
        NzDropDownModule],
      declarations: [HomeComponent],
      providers: [
        { provide: SearchService, useValue: searchServiceStub },
        { provide: NZ_ICONS, useValue: icons },
      ],
    })
      .compileComponents();
    const searchservice = TestBed.inject(SearchService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find h2 element with textcontent "Find Github Users" in the template', () => {
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('h2'));
    el = de.nativeElement;
    expect(el.textContent).toContain('Find Github Users');
  });

  it('should find input element in the template', () => {
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('input'));
    expect(de.nativeElement.value.trim()).toBe('');
    de.nativeElement.value = 'john';
    expect(de.nativeElement.value.trim()).toBe('john');
    fixture.detectChanges();
  });

  it('onChange should implement with stubbed data', () => {
    spyOn(component, 'onChange').and.callThrough();
    fixture.detectChanges();
    component.onChange('john');
    expect(component.onChange).toHaveBeenCalled();
    expect(component.onChange).toHaveBeenCalledOnceWith('john');
    expect(component.collection.length).toBe(6);
    expect(component.collection[1].login).toBe('johnpapa');
    expect(component.collection).toEqual(jasmine.objectContaining(Users.items));
  });

  it('should display table of users in the template', () => {
    spyOn(component, 'onChange').and.callThrough();
    component.onChange('john');
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.table'));
    el = de.nativeElement;

    fixture.detectChanges();
    expect(el.innerHTML).toContain('thead');
    expect(el.innerHTML).toContain('tbody');
    expect(el.innerText.replace(/\s\s+/g, ' ')).toContain(Users.items[0].login);
  });
});
