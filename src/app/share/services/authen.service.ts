import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AuthenService{
    constructor(){}

    private accessKey = 'accessToken';

    getAuthenticate() : any {
        return localStorage.getItem(this.accessKey);
    }

    setAuthenticate():any{
        localStorage.setItem(this.accessKey,this.accessKey);
    }

    clearAuthenticated():void {
        localStorage.removeItem(this.accessKey);
    }
}