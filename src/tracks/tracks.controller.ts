import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TracksService } from './tracks.service';

@UseGuards(JwtAuthGuard)
@Controller('tracks')
export class TracksController {

  constructor( private readonly trackServ: TracksService ){}

  @Get()
  getTracks() {
   return this.trackServ.getTracks()
  }

  @Get(':trackId')
  getTrack(@Param('trackId') trackId : number){
    return this.trackServ.getTrack(trackId)
  }
}
