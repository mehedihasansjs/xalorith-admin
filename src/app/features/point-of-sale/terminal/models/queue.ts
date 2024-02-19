import { EntityRef } from '../../../../core/models/entity-ref';

export class Queue {
  id?: string;
  name?: string;
  customer?: EntityRef;
  products?: EntityRef[];
  createdAt?: string;
  updatedAt?: string;
  total?: number;
  completed?: number;
  createdBy?: EntityRef;
  updatedBy?: EntityRef;
}
