import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Episode } from './entities/episode.entity';
import { CreateEpisodeDto } from './dtos/create-episode.dto';
import { CoreOutput } from './dtos/output.dto';
import { PodcastsService } from './podcasts.service';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';

@Resolver(() => Episode)
export class EpisodesResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Query((returns) => [Episode])
  async getEpisodes(@Args('id') id: number): Promise<Episode[]> {
    const { ok, podcast, error } = await this.podcastsService.getPodcast(id);

    const episodes = podcast.episodes;
    return episodes;
  }

  @Query((returns) => Episode)
  async getEpisode(
    @Args('podcastId') podcastId: number,
    @Args('episodeId') episodeId: number,
  ): Promise<Episode> {
    const { ok, podcast, error } =
      await this.podcastsService.getPodcast(podcastId);

    if (!ok) {
      throw new Error(error);
    }

    const episode = podcast.episodes.find(
      (episode) => episode.id === episodeId,
    );

    if (!episode) {
      throw new Error(`Episode with id ${episodeId} not found`);
    }

    return episode;
  }

  @Mutation((returns) => Episode)
  async createEpisode(
    @Args() createEpisodeDto: CreateEpisodeDto,
  ): Promise<CoreOutput> {
    return await this.podcastsService.createEpisode(createEpisodeDto);
  }

  @Mutation((returns) => Boolean)
  async updateEpisode(
    @Args() updateEpisodeDto: UpdateEpisodeDto,
  ): Promise<boolean> {
    await this.podcastsService.updateEpisode(updateEpisodeDto);
    return true;
  }

  @Mutation((returns) => Boolean)
  async deleteEpisode(
    @Args('podcastId') podcastId: number,
    @Args('episodeId') episodeId: number,
  ): Promise<boolean> {
    const { error } = await this.podcastsService.deleteEpisode({
      podcastId,
      episodeId,
    });
    if (error) {
      throw new Error(error);
    }
    return true;
  }
}
