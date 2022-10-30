import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpAdapter } from 'src/common/adapters/http-adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel : Model<Pokemon>,
    private readonly http : HttpAdapter
  ){}

  async executeSEED(){

    await this.pokemonModel.deleteMany();

    let pokemonData : {name:string,no:number}[] = [];

    let responseArray = await this.http.get()

    responseArray.forEach((value) => {
      const array = value.url.split("/");
      const pkmNumber = +array[array.length-2];
      pokemonData.push({name : value.name , no : pkmNumber})
    });

    await this.pokemonModel.insertMany(pokemonData);

    return "SEED executed";
  }
}
