import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { AuthenService } from './authen.service';

@Injectable({
    providedIn: 'root'
})

export class CategoryService{
    constructor(
        private authen:AuthenService,
        private http:HttpService
    ){

    }

    loadCategory(option:OptionSearch){
        let url=`category/_get.php?sp=${Number(option.sp)-1}&lp=${Number(option.lp)}`;
        return this.http.requestGet(url,this.authen.getAuthenticate())
            .toPromise() as Promise<any>
    }

    deleteCategory(_id:string){
        let url=`category/_delete.php?_id=${_id}`;
        return this.http.requestDelete(url,this.authen.getAuthenticate())
            .toPromise() as Promise<any>
    }

    loadCategoryInsert(){
        let url=`category/_get_insert.php?`;
        return this.http.requestGet(url,this.authen.getAuthenticate())
            .toPromise() as Promise<any>
    }

    InsertCategory(model: ICategory){
        return this.http.requestPost('category/_post.php',model)
            .toPromise() as Promise<any>;
    }
}

export interface ICategory{
    name:string,
}

export interface OptionSearch{
    sp?:Number,
    lp?:Number,
    text_search?:string,
}