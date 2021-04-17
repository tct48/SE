import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { AuthenService } from './authen.service';

@Injectable({
    providedIn: 'root'
})

export class DashboardService{
    constructor(
        private authen:AuthenService,
        private http:HttpService
    ){

    }

    // BestSeller
    loadProductPopular(){
        let url=`dashboard/_get.php?type=popular`;
        return this.http.requestGet(url,this.authen.getAuthenticate())
            .toPromise() as Promise<any>
    }

    // Most Visited
    loadProductVisited(){
        let url=`dashboard/_get.php?type=visit`;
        return this.http.requestGet(url,this.authen.getAuthenticate())
            .toPromise() as Promise<any>
    }
}
