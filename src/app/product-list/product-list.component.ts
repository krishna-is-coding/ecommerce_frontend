import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, RouterLinkActive } from '@angular/router';  // ✅ Added ActivatedRoute
import { ProductService } from '../services/product.service';
import { Product } from '../common/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,  // ✅ standalone component
  imports: [CommonModule, RouterModule,FormsModule],  // ✅ CommonModule for ngIf/ngFor
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;

  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
  }

  listProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      // get category id and convert it into num type
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }
    this.productService.getProductsByCategory(this.currentCategoryId).subscribe(data => {
      this.products = data;
    })
  }
}
