import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AuthenService{
    constructor(){}

    private accessKey = 'accessToken';

    getAuthenticate() : any {
        return this.accessKey;
    }

    clearAuthenticated():void {
        localStorage.removeItem(this.accessKey);
    }
}