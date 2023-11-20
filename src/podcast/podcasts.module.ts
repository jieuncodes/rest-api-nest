import { Module } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';
import { PodcastsResolver } from './podcasts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Podcast } from './entities/podcast.entity';
import { Episode } from './entities/episode.entity';
import { EpisodesResolver } from './episodes.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Podcast, Episode])],
  providers: [PodcastsService, PodcastsResolver, EpisodesResolver],
})
export class PodcastsModule {}
