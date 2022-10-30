import { Result } from "src/seed/interfaces/pokemon-response.interface";



export interface HttpAdapterInterface {
    get() : Promise<Result[]> ;
}


