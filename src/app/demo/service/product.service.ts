import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';
import { Car} from '../components/pages/crud/models';
import { environment} from '../../../environments/environment';
import { Observable } from 'rxjs';
@Injectable()
export class ProductService {

    URL = `${environment.apiUrl}/cars`;

    constructor(private http: HttpClient) { }

    getProductsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProducts() {
        return this.http.get<any>('assets/demo/data/products.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getCars(): Observable<any> {
        return this.http.get<Car[]>(this.URL);
    }
}
