import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TreeNode } from 'primeng/api';

@Injectable()
export class StateService {
    constructor(private http: HttpClient) {}

    menus!: TreeNode[];

    apiUrl = 'assets/demo/data/states.json';

    getMenu() {
        return this.http.get(this.apiUrl).pipe(
            map((response: any) => {
                const states = response.data;
                return states;
            })
        );
    }
}
