import { HttpAdapterInterface } from "../interfaces/http-adapter.interface";
import {Injectable} from "@nestjs/common"
import { JSONResponse, Result } from "src/seed/interfaces/pokemon-response.interface";

@Injectable()
export class HttpAdapter implements HttpAdapterInterface{
    async get(): Promise<Result[]>  {
        const result = await fetch("https://pokeapi.co/api/v2/pokemon?limit=650");
        const json : JSONResponse = await result.json();
        const responseArray : Result[] = json.results;
        return responseArray;
    }

}


