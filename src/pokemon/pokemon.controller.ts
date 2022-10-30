import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { HttpCode } from '@nestjs/common/decorators';
import { ParsemongoidPipe } from 'src/common/pipes/parsemongoid.pipe';
import { QueryParamDto } from 'src/common/dtos/query.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  @HttpCode(200)
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll(@Query() queryParam : QueryParamDto ) {
    return this.pokemonService.findAll(queryParam);
  }

  @Get(':param')
  findOne(@Param('param') param: string) {
    return this.pokemonService.findOne(param);
  }

  @Patch(':param')
  update(@Param('param') param: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(param, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParsemongoidPipe ) id: string) {
    return this.pokemonService.remove(id);
  }
}
