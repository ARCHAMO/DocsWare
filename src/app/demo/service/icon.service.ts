import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class IconService {
    constructor(private http: HttpClient) {}

    icons!: any[];

    selectedIcon: any;

    apiUrl = 'assets/demo/data/icons.json';

    apiUrlIconList = 'assets/demo/data/iconsList.json';

    getIcons() {
        return this.http.get(this.apiUrl).pipe(
            map((response: any) => {
                this.icons = response.icons;
                return this.icons;
            })
        );
    }

    getIconsList() {
        return this.http.get(this.apiUrlIconList).pipe(
            map((response: any) => {
                const icons = response.data;
                return icons;
            })
        );
    }
}
