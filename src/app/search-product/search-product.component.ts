import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent {
  searchKeyword: string = '';
  private typingTimer: any; // for debounce

  constructor(private router: Router) {}

  // Trigger when typing stops
  onSearchChange(value: string) {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.onSearch(); // run search after 500ms of no typing
    }, 500);
  }

  // Navigate/search
  onSearch() {
    if (this.searchKeyword.trim()) {
      this.router.navigate(['/search', this.searchKeyword]);
    }
  }
}

