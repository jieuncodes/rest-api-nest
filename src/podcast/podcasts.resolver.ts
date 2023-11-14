import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Podcast } from './entities/podcast.entity';
import { Episode } from './entities/episode.entity';
import { CreatePodcastDto } from './dtos/create-podcast.dto';
import { PodcastsService } from './podcasts.service';
import { UpdatePodcastDto } from './dtos/update-podcast.dto';
import { CreateEpisodeDto } from './dtos/create-episode.dto';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';
import { CoreOutput } from './dtos/output.dto';
import {
  EpisodeSearchOutput,
  PodcastSearchInput,
  PodcastSearchOutput,
} from './dtos/podcast.dto';

@Resolver(() => Podcast)
export class PodcastsResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Query((returns) => [Podcast])
  getAllPodcasts() {
    return this.podcastsService.getAllPodcasts();
  }

  @Mutation((returns) => CoreOutput)
  createPodcast(
    @Args('createPodcastInput') createPodcastDto: CreatePodcastDto,
  ): CoreOutput {
    return this.podcastsService.createPodcast(createPodcastDto);
  }

  @Query((returns) => Podcast, { nullable: true })
  async getPodcast(@Args('id') id: number): Promise<PodcastSearchOutput> {
    return await this.podcastsService.getPodcast(id);
  }

  @Mutation((returns) => Podcast)
  updatePodcast(
    @Args('id') id: number,
    @Args() updatePodcastDto: UpdatePodcastDto,
  ): Promise<PodcastSearchOutput> {
    return this.podcastsService.updatePodcast(id, updatePodcastDto);
  }

  @Mutation((returns) => Boolean)
  async deletePodcast(@Args('id') id: number): Promise<PodcastSearchOutput> {
    return await this.podcastsService.deletePodcast(id);
  }
}
