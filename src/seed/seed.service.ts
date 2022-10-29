import { Injectable } from '@nestjs/common';
import { JSONResponse, Result } from './interfaces/pokemon-response.interface';

@Injectable()
export class SeedService {

  async executeSEED(){

    const result = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
    const json : JSONResponse = await result.json();
    const responseArray : Result[] = json.results;

    let pokemonData : {name:string,no:number}[] = [];
    responseArray.forEach((value) => {
      const array = value.url.split("/");
      const pkmNumber = +array[array.length-2];
      pokemonData.push({name : value.name , no : pkmNumber})
    });

    return "SEED executed";
  }
}
