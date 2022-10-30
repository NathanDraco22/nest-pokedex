import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';


@Injectable()
export class ParsemongoidPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    console.log(value);
    if( !isValidObjectId(value)) throw new BadRequestException('Invalid ID')
    return value;
  }
}
