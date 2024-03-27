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
import { tap, catchError } from 'rxjs/operators';


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
        color: '',

      };

      colors: Color[] = Object.values(Color);

    productDialog: boolean = false;

    productDialogUpdate: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    cars : any

    id: number;


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
        this.garageService.getCars().subscribe({


            next: (car: any) => {

              // Logique pour le callback next
            },
            error: (error: any) => {
              // Logique pour le callback error
            },
            complete: () => {
              // Logique pour le callback complete
            }
          });

    }


    openNew() {

        this.submitted = false;
        this.productDialog = true;

    }

    openDelete() {
        this.deleteProductsDialog = true;
    }

    deleteSelecteCar(id: number): void {
      this.garageService.deleteSelecteCar(id).subscribe({
        next: () => {
          console.log('Objet supprimé avec succès.');
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de l\'objet :', error);
        },
        complete: () => {
          // Complété
        }
      });
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });

      this.deleteProductsDialog = false;

    }

    editProduct() {
        this.submitted = false;
        this.productDialogUpdate = true;
    }



    updateCar() {
        this.garageService.updateCar(this.car)
          .subscribe({
            next: response => {
              console.log('Produit mis à jour avec succès', response);
              // Effectue les actions supplémentaires nécessaires après la mise à jour réussie
            },
            error: error => {
              console.error('Une erreur s\'est produite lors de la mise à jour du produit', error);
              // Gère les erreurs de manière appropriée
            },
            complete: () => {
              // Fonction de rappel complète (facultative)
            }
          });

          this.productDialogUpdate = false;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'car update', life: 3000 });
    }




    deleteProducts(id: number) {
        this.deleteProductDialog = true;
       // this.id = { ...id };
    }


    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.cars = this.car.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];
    }

    deleteProduct() {
        this.deleteProductDialog = false;
        this.cars = this.cars.filter(val => val.id !== this.car.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.car = {};
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
