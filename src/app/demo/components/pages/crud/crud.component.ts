import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { GarageService } from './garage.service';
import {Car} from './models'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Color } from './colors.enum';
import { Observer } from 'rxjs';


@Component({

    templateUrl: './crud.component.html',
    providers: [MessageService]
})
export class CrudComponent implements OnInit {


    formulaireGroup: FormGroup;

    car: any = {
        id: null,
        model: '',
        brand: '',
        year: null,
        color: ''
      };

      colors: Color[] = Object.values(Color);

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    cars : Object


    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private formBuilder: FormBuilder,
        private productService: ProductService, private messageService: MessageService, private garageService: GarageService) { }

    ngOnInit() {


        this.garageService.getCars().subscribe(datas =>{

            this.cars = datas;
        })


        this.formulaireGroup = this.formBuilder.group({
            id: [null, Validators.required],
            model: [null, Validators.required],
            brand: [null, Validators.required],
            year: [null, Validators.required],
            color: [null, Validators.required]
        })

        this.productService.getProducts().then(data => this.products = data);

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }





    ///this.garageService.getCars().subscribe(datas =>{

      //  this.cars = datas;
   // })


    getCars() {
        this.garageService.getCars().subscribe(
          datas => {
           this.cars = datas;
          },
          error => {
            console.log(error);
          }
        );
    };


    openNew() {
        
        this.submitted = false;
        this.productDialog = true;

    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = {};
    }

    hidesDialog() {
        this.productDialog = false;
        this.submitted = false;
    }


    onSubmit(): void {
        this.submitted = true;
        const observer: Observer<any> = {
          next: response => {
            console.log('Voiture ajoutée avec succès :');
            this.formulaireGroup.reset();
            // Réinitialiser le formulaire ou effectuer d'autres actions
          },
          error: error => {
            console.log('Erreur lors de l\'ajout de la voiture :');
            // Gérer l'erreur ou afficher un message d'erreur à l'utilisateur
          },
          complete: () => {
            // Logique à exécuter lorsque l'observable est complet (facultatif)
          }
        };

        this.garageService.addCar(this.car).subscribe(observer);
        this.formulaireGroup.reset({
            id: null,
            model: '',
            brand: '',
            year: null,
            color: ''
        } );
        this.productDialog = false;
      }


  /*  addCars(car: Car) {
        this.submitted = true;
        const car1: Car = {
            id: 1,
            model: 'Camry',
            brand: 'Toyota',
            year: 2022,
            color: car.color

        };

        this.garageService.addCar(car).subscribe(
        response => {
        console.log('Produit ajouté avec succès :', response);
              // Autres actions à effectuer après l'ajout réussi
        })


    }*/






    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

}
