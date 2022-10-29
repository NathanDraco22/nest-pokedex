import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { JSONResponse, Result } from './interfaces/pokemon-response.interface';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel : Model<Pokemon>
  ){}

  async executeSEED(){

    await this.pokemonModel.deleteMany();

    const result = await fetch("https://pokeapi.co/api/v2/pokemon?limit=650");
    const json : JSONResponse = await result.json();
    const responseArray : Result[] = json.results;

    let pokemonData : {name:string,no:number}[] = [];
    responseArray.forEach((value) => {
      const array = value.url.split("/");
      const pkmNumber = +array[array.length-2];
      pokemonData.push({name : value.name , no : pkmNumber})
    });

    await this.pokemonModel.insertMany(pokemonData);

    return "SEED executed";
  }
}
