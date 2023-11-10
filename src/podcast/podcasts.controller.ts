import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEpisodeDto } from './dtos/create-episode.dto';
import { CreatePodcastDto } from './dtos/create-podcast.dto';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';
import { UpdatePodcastDto } from './dtos/update-podcast.dto';
import { PodcastsService } from './podcasts.service';

@Controller('/podcasts')
export class PodcastsController {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Get()
  getAllPodcasts() {
    return this.podcastsService.getAllPodcasts();
  }

  @Post()
  createPodcast(@Body() createPodcastDto: CreatePodcastDto) {
    return this.podcastsService.createPodcast(createPodcastDto);
  }

  @Get('/:id')
  getPodcast(@Param('id') id: number) {
    return this.podcastsService.getPodcast(id);
  }

  @Patch('/:id')
  updatePodcast(
    @Param('id') id: number,
    @Body() updatePodcastDto: UpdatePodcastDto,
  ) {
    return this.podcastsService.updatePodcast(id, updatePodcastDto);
  }

  @Delete('/:id')
  deletePodcast(@Param('id') id: number) {
    return this.podcastsService.deletePodcast(id);
  }
}

@Controller('/podcasts/:id')
export class EpisodeController {
  constructor(private readonly podcastService: PodcastsService) {}
  @Get('/episodes')
  getEpisodes(@Param('id') podcastId: number) {
    return this.podcastService.getEpisodes(podcastId);
  }

  @Post('/episodes')
  createEpisode(
    @Param('id') podcastId: number,
    @Body() createEpisodeDto: CreateEpisodeDto,
  ) {
    return this.podcastService.createEpisode(createEpisodeDto);
  }

  @Patch('/episodes/:episodeId')
  updateEpisode(
    @Param('id') podcastId: number,
    @Param('episodeId') episodeId: number,
    @Body() updateEpisodeDto: UpdateEpisodeDto,
  ) {
    return this.podcastService.updateEpisode(
      podcastId,
      episodeId,
      updateEpisodeDto,
    );
  }

  @Delete('/episodes/:episodeId')
  deleteEpisode(
    @Param('id') podcastId: number,
    @Param('episodeId') episodeId: number,
  ) {
    return this.podcastService.deleteEpisode(podcastId, episodeId);
  }
}
