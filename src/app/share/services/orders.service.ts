import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { AuthenService } from './authen.service';
import { OptionSearch } from './product.service';

@Injectable({
    providedIn: 'root'
})

export class OrdersService{
    constructor(
        private authen:AuthenService,
        private http:HttpService
    ){

    }

    loadOrders(option:OptionSearch,_id?:string){
        let url=`orders/_get.php?sp=${option.sp}&lp=${option.lp}`;
        if(_id){
            url=`orders/_get.php?_id=${_id}`;
        }
        console.log(url)
        return this.http.requestGet(url,this.authen.getAuthenticate())
            .toPromise() as Promise<any>
    }

    // UpdateProduct(model:IProduct){
    //     return this.http.requestPut('product/_put.php',this.authen.getAuthenticate(),model)
    //         .toPromise() as Promise<any>;
    // }

    updateOrders(model:IUpdateStatus){
        return this.http.requestPut('orders/_put.php',this.authen.getAuthenticate(), model)
            .toPromise() as Promise<any>;
    }

    loadOrdersBetween(option:OptionSearch,{before, after}){
        let url=`orders/_get.php?sp=${option.sp}&lp=${option.lp}&search=1&before=${before}&after=${after}`;
        return this.http.requestGet(url,this.authen.getAuthenticate())
            .toPromise() as Promise<any>
    }

    loadPlotGraph({before,after}){
        let url=`orders/_get_graph.php?before=${before}&after=${after}`;
        return this.http.requestGet(url,this.authen.getAuthenticate())
            .toPromise() as Promise<any>
    }


}

export interface IUpdateStatus{
    _id:string,
    status:number
}
