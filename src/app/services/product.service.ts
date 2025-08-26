import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = "http://localhost:8080/api/products";

  constructor(private httpClient: HttpClient) {}

 

  // Get products by category id
 getProductsByCategory(theCategoryId: number): Observable<Product[]>{
    const searchUrl = `${this.apiUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.httpClient.get<GetResponse>(searchUrl)
                          .pipe(map(response=> response._embedded.products));
}
searchProducts(keyword: string) {
  const searchUrl = `${this.apiUrl}/search/findByNameContaining?name=${keyword}`;
  return this.httpClient.get<GetResponse>(searchUrl).pipe(
    map(response => response._embedded.products)
  );
}

getProduct(theProductId: number): Observable<Product> {
  const productUrl = `${this.apiUrl}/${theProductId}`;
  return this.httpClient.get<Product>(productUrl);
}

// ✅ Correct interface name
}

interface GetResponse {
  _embedded: {
    products: Product[];
  };
}
