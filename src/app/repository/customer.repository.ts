import { Injectable } from "@angular/core";
import { Customer } from "../models";
import { BaseRepository } from "./base.repository";

@Injectable({
    providedIn: 'root'
})
export class CustomerRepository extends BaseRepository<Customer> {}
