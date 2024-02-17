import { Injectable } from "@angular/core";
import { BaseRepository } from "./base.repository";
import { Product } from "../models";

@Injectable({
    providedIn: 'root'
})
export class ProductRepository extends BaseRepository<Product> {}
