import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { AuthenService } from './authen.service';
import { OptionSearch } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(
    private http: HttpService,
    private authen: AuthenService
  ) { }

  loadIDPromotion() {
    let url = "promotion/_get_max_id.php";
    return this.http.requestGet(url, this.authen.getAuthenticate())
      .toPromise() as Promise<any>
  }

  loadAllPromotion(option: OptionSearch) {
    let url = `promotion/_get.php?sp=${Number(option.sp)-1}&lp=${option.lp}`;
    return this.http.requestGet(url, this.authen.getAuthenticate())
      .toPromise() as Promise<any>;

  }

  updateStatus(model:any) {
    let url = `promotion/_put.php?`;
    return this.http.requestPut(url, this.authen.getAuthenticate(), model).toPromise() as Promise<any>;
  }

  deletePromotion(_id:any) {
    let url = `promotion/_delete.php?_id=${_id}`;
    return this.http.requestDelete(url, this.authen.getAuthenticate()).toPromise() as Promise<any>;
  }

  insertPromotion(model: any) {
    let url = "promotion/_post.php";
    return this.http.requestPost(url, model)
      .toPromise() as Promise<any>
  }
}
