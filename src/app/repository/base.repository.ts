import { WritableSignal, computed, signal } from "@angular/core";
import { Content } from "../models";

export class BaseRepository<T extends Content> {
    private items: WritableSignal<T[]> = signal<T[]>([]);
    
    get() {
        return this.items.asReadonly();
    }
    
    getById(id: string) {
        const items: T[] = this.items();
        return computed(() => items.find(item => item.id === id));
    }

    upsert(item: T) {
        const exists = this.getById(item.id);
        if (exists()) {
            this.update(item);
        } else {
            this.add(item);
        }
    }

    delete(id: string) {
        this.items.update(currentItems => currentItems.filter(item => item.id !== id));
    }

    clear() {
        this.items.update(() => []);
    }

    private add(item: T) {
        this.items.update(currentItems => [...currentItems, item]);
    }

    private update(item: T) {
        this.items.update(currentItems => {
            const index = currentItems.findIndex(i => i.id === item.id);
            currentItems[index] = item;
            return currentItems;
        });
    }
}
