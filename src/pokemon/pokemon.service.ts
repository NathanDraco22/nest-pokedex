import { Injectable } from '@nestjs/common';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { QueryParamDto } from 'src/common/dtos/query.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel : Model<Pokemon>
  ){}


  async create(createPokemonDto: CreatePokemonDto) {

    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const result = await this.pokemonModel.create(createPokemonDto);
      return result;
    } catch (error) {
      if (error.code === 11000){
        throw new BadRequestException("Registro de Pokemon Duplicado");
      }
      console.log(error);
      throw new InternalServerErrorException("Verify server logs");
    }
  
  }

  findAll(queryParam : QueryParamDto ) {
    const {limit = 10 , offset = 0 } = queryParam;
    let algo = this.pokemonModel.find().skip(offset).limit(limit).select("-__v");
    return algo;
  }

  async findOne(param: string) : Promise<Pokemon> {
    
    let pokemon : Pokemon;
    if (!isNaN(+param)){
      pokemon = await this.pokemonModel.findOne({no : param});
    }
    if (isValidObjectId(param)){
      pokemon = await this.pokemonModel.findById(param);
    }
    if(!pokemon){
      pokemon = await this.pokemonModel.findOne({name : param});
    }
    if(!pokemon ){
      throw new NotFoundException("Pokemon not found");
    }
    return pokemon;
  
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    let pokemonResult = await this.findOne(id);
    await pokemonResult.updateOne(updatePokemonDto);
    return {
      ...pokemonResult , ...updatePokemonDto
    };
  }

  async remove(id: string) {

      let {deletedCount } =  await this.pokemonModel.deleteOne({_id : id});
      if(!deletedCount) throw new BadRequestException("Item doesn't exists yeaaaah");
      return true;
  
    }

}
