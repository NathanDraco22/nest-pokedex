import { Document } from "mongoose"; 
import { Schema } from "@nestjs/mongoose";
import { Prop, SchemaFactory } from "@nestjs/mongoose/dist";

@Schema()
export class Pokemon extends Document {
    
    //es unico y anade un indice para ayudar a buscar rapido
    @Prop({unique : true,index : true})
    name : string;

    @Prop({unique : true,index : true})
    no : number;

}

export const PokemonSchema = SchemaFactory.createForClass( Pokemon )
