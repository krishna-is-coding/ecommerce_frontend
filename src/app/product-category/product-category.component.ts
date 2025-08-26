import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProductCategory } from '../common/product-category';
import { ProductCategoryService } from '../services/product-category.service';

@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  productCategories: ProductCategory[] = [];

  constructor(
    private productCategoryService: ProductCategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProductCategories();
    });
  }

  listProductCategories() {
    this.productCategoryService.getProductCategories().subscribe((data: ProductCategory[]) => {
      this.productCategories = data;
    });
  }
}

