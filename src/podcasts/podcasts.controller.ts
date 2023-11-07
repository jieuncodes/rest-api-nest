import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PodcastsService } from './podcasts.service';
import { CreatePodcastDto } from './dto/create-podcast.dto';
import { UpdatePodcastDto } from './dto/update-podcast.dto';

@Controller('podcasts')
export class PodcastsController {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Post()
  create(@Body() createPodcastDto: CreatePodcastDto) {
    return this.podcastsService.create(createPodcastDto);
  }

  @Get()
  findAll() {
    return this.podcastsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.podcastsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePodcastDto: UpdatePodcastDto) {
    return this.podcastsService.update(+id, updatePodcastDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.podcastsService.remove(+id);
  }

  @Get(':id/episodes')
  findEpisodes(@Param('id') podcastId: number) {
    return this.podcastsService.findEpisodes(+podcastId);
  }
  @Post(':id/episodes')
  createEpisode(@Param('id') podcastId: number, @Body() body) {
    return this.podcastsService.createEpisode(+podcastId, body);
  }
  @Patch(':id/episodes/:episodeId')
  updateEpisode(
    @Param('id') podcastId: number,
    @Param('episodeId') episodeId: number,
    @Body() body,
  ) {
    return this.podcastsService.updateEpisode(+podcastId, +episodeId, body);
  }
  @Delete(':id/episodes/:episodeId')
  deleteEpisode(
    @Param('id') podcastId: number,
    @Param('episodeId') episodeId: number,
  ) {
    return this.podcastsService.deleteEpisode(+podcastId, +episodeId);
  }
}
