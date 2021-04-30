import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { AuthenService } from './authen.service';

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
        if(option.before){
            url = `orders/_get.php?sp=${option.sp}&lp=${option.lp}&search=1&before=${option.before}&after=${option.after}`
            console.log("GGG");
        }
        if(_id){
            url=`orders/_get.php?_id=${_id}`;
        }
        return this.http.requestGet(url,this.authen.getAuthenticate())
            .toPromise() as Promise<any>
    }

    loadPaymentByID(orders:string){
        let url = `payment/_get.php?orders=${orders}`;
        return this.http.requestGet(url, this.authen.getAuthenticate())
            .toPromise() as Promise<any>;
    }

    getAddressByOrdersID(orders:string){
        let url = `address/_get.php?orders=${orders}`;
        return this.http.requestGet(url, this.authen.getAuthenticate())
            .toPromise() as Promise<any>;
    }

    getSupplie(orders:string){
        let url = `orders/_get_supplie_by_id.php?orders=${orders}`;
        console.log(url)
        return this.http.requestGet(url, this.authen.getAuthenticate())
            .toPromise() as Promise<any>;
    }

    getPaymentByID(orders:string){
        let url = `address/_get.php?orders=${orders}`;
        return this.http.requestGet(url, this.authen.getAuthenticate())
            .toPromise() as Promise<any>; 
    }

    loadReport(){
        return this.http.requestGet('orders/_get_report.php',this.authen.getAuthenticate())
            .toPromise() as Promise<any>
    }

    updateOrders(model:IUpdateStatus){
        return this.http.requestPut('orders/_put.php',this.authen.getAuthenticate(), model)
            .toPromise() as Promise<any>;
    }

    updateSupp(model:any){
        return this.http.requestPut('orders/_put_supplies.php', this.authen.getAuthenticate(), model)
            .toPromise() as Promise<any>;
    }

    deleteOrders(_id:string){
        return this.http.requestDelete(`orders/_delete.php?_id=${_id}`,this.authen.getAuthenticate())
            .toPromise() as Promise<any>;
    }

    loadQuater(currentYear:number){
        return this.http.requestGet('orders/_get_quater.php',this.authen.getAuthenticate())
            .toPromise() as Promise<any>;
    }

    loadDoughNut(){
        return this.http.requestGet('orders/_get_doughnut.php', this.authen.getAuthenticate())
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
export interface OptionSearch{
    sp?:Number,
    lp?:Number,
    before?:any,
    after?:any,
    text_search?:string,
}