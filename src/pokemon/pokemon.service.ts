import { Injectable } from '@nestjs/common';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  findAll() {
    return `This action returns all pokemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
