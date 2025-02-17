import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators'
import { ProductCategory } from '../common/product-category';
@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }


  getProductList(categoryId: number): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByProductCategory_Id?id=${categoryId}`

    return this.getProductsFromServer(searchUrl);

  }

  getProductListPaginate(thePage: number,
    thePageSize: number,
    categoryId: number): Observable<GetResponseProducts> {

    const searchUrl = `${this.baseUrl}/search/findByProductCategory_Id?id=${categoryId}`
      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);

  }

  getProduct(productId: number): Observable<Product> {
    const searchUrl = `${this.baseUrl}/${productId}`
    return this.httpClient.get<Product>(searchUrl);
  }

  searchProducts(keyword: string) {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
    return this.getProductsFromServer(searchUrl);
  }


  searchProductPaginate(thePage: number,
    thePageSize: number,
    keyword: string): Observable<GetResponseProducts> {

    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`
                    + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);

  }

  private getProductsFromServer(searchUrl: string) {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(repsonse => repsonse._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductsCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductsCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
