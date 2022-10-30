import { Module } from '@nestjs/common';
import { HttpAdapter } from './adapters/http-adapter';
import { ParsemongoidPipe } from './pipes/parsemongoid.pipe';

@Module({
    providers : [HttpAdapter],
    exports : [HttpAdapter]
})
export class CommonModule {}
