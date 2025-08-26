import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private apiUrl = "http://localhost:8080/api/product-category";

  constructor(private httpClient: HttpClient) {}

  // ✅ Match backend response correctly
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.apiUrl).pipe(
      map(response => response._embedded.ProductCategory)  // 👈 FIXED
    );
  }
}

interface GetResponseProductCategory {
  _embedded: {
    ProductCategory: ProductCategory[]; // 👈 FIXED
  };
}
