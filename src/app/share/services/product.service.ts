import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { AuthenService } from './authen.service';

@Injectable({
    providedIn: 'root'
})

export class ProductService{
    constructor(
        private authen:AuthenService,
        private http:HttpService,
        private https: HttpClient
    ){

    }

    loadProduct(option:OptionSearch){
        let url=`product/_get.php?sp=${option.sp}&lp=${option.lp}`;
        return this.http.requestGet(url,this.authen.getAuthenticate())
            .toPromise() as Promise<any>
    }

    InsertProduct(model: IProduct){
        return this.http.requestPost('product/_post.php',model)
            .toPromise() as Promise<any>;
    }

    UploadFile(file_data){
        return this.http.requestPost('product/upload-file.php', file_data)
            .toPromise() as Promise<any>;
    }

    getMaxID(){
        return this.http.requestGet('product/_get_max_id.php',this.authen.getAuthenticate())
            .toPromise() as Promise<any>;
    }

    UpdateProduct(model:IProduct){
        return this.http.requestPut('product/_put.php',this.authen.getAuthenticate(),model)
            .toPromise() as Promise<any>;
    }

    DeleteProduct(_id: string){
        return this.http.requestDelete(`product/_delete.php?_id=${_id}`,this.authen.getAuthenticate())
            .toPromise() as Promise<any>;
    }
}

export interface IProduct{
    _id?:number,
    name:string,
    price:number,
    category:number,
    image:string,
    visit:number,
    updated_at:number,
    unit:number,
    taste:string 
}

export interface OptionSearch{
    sp?:Number,
    lp?:Number,
    text_search?:string,
}