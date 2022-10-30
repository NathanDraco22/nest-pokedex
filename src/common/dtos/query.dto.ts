import { IsOptional, IsPositive, Min } from "class-validator";


export class QueryParamDto {
    @IsPositive()
    @IsOptional()
    @Min(1)
    limit?: number;

    @IsPositive()
    @IsOptional()
    @Min(0)
    offset?:number;

}


