import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apikey:string = "Ny7IhC7z6nGFnl203ai4neAFMAkvdO8f";
  private servicioUrl:string = "https://api.giphy.com/v1/gifs";
  private _historial:string[] = [];

  public resultados: any[] = [];

  get historial(){
    
    return [...this._historial];
  }

  constructor(private http : HttpClient ){ 
    if (localStorage.getItem("historial")){
      this._historial = JSON.parse(localStorage.getItem("historial")!);
    }
  }

  buscarGifs(query:string){

    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem("historial", JSON.stringify(this._historial));

    }

    const params = new HttpParams()
    .set("api_key", this.apikey)
    .set("limit", "10")
    .set("q",query);

    this.http.get(`${this.servicioUrl}/search`, {params} )
    .subscribe((resp:any) =>{
        this.resultados = resp.data;
      })
  }
}
