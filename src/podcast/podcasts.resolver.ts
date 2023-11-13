import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Podcast } from './entities/podcast.entity';
import { Episode } from './entities/episode.entity';
import { CreatePodcastDto } from './dtos/create-podcast.dto';
import { PodcastsService } from './podcasts.service';
import { UpdatePodcastDto } from './dtos/update-podcast.dto';
import { CreateEpisodeDto } from './dtos/create-episode.dto';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';
import { CoreOutput } from './dtos/output.dto';

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
    const { ok, error } = this.podcastsService.createPodcast(createPodcastDto);

    if (!ok) {
      return { ok, error };
    }

    return { ok: true };
  }

  @Query((returns) => Podcast, { nullable: true })
  async getPodcast(@Args('id') id: number): Promise<Podcast> {
    const { ok, podcast, error } = await this.podcastsService.getPodcast(id);
    return { ok, podcast, error };
  }

  @Mutation((returns) => Podcast)
  updatePodcast(
    @Args('id') id: number,
    @Args() updatePodcastDto: UpdatePodcastDto,
  ): Promise<Podcast> {
    this.podcastsService.updatePodcast(id, updatePodcastDto);
    return this.getPodcast(id);
  }

  @Mutation((returns) => Boolean)
  async deletePodcast(@Args('id') id: number): Promise<boolean> {
    await this.podcastsService.deletePodcast(id);
    return true;
  }

  @Query((returns) => [Episode])
  async getEpisodes(@Args('id') id: number): Promise<Episode[]> {
    const { episodes, error } = await this.podcastsService.getEpisodes(id);
    if (error) {
      throw new Error(error);
    }
    return episodes;
  }

  @Mutation((returns) => Episode)
  async createEpisode(
    @Args() createEpisodeDto: CreateEpisodeDto,
  ): Promise<Episode> {
    const createdResult = this.podcastsService.createEpisode(createEpisodeDto);

    if (createdResult.error) {
      throw new Error(createdResult.error);
    }

    if (!createdResult.episodeId) {
      throw new Error('Failed to create an episode for unknown reasons.');
    }
    const findEpisodeResult = await this.podcastsService.findEpisode(
      createEpisodeDto.podcastId,
      createdResult.episodeId,
    );

    if (findEpisodeResult.error) {
      throw new Error('Failed to retrieve the created episode.');
    }

    return findEpisodeResult.episode;
  }

  @Mutation((returns) => Boolean)
  async updateEpisode(
    @Args() updateEpisodeDto: UpdateEpisodeDto,
  ): Promise<boolean> {
    const { podcastId, episodeId } = updateEpisodeDto;

    const { episode, error: episodeFindErr } = this.podcastsService.findEpisode(
      podcastId,
      episodeId,
    );
    if (episodeFindErr) {
      throw new Error(episodeFindErr);
    }
    const updateResult = this.podcastsService.updateEpisode(
      podcastId,
      episodeId,
      updateEpisodeDto,
    );
    if (updateResult.error) {
      throw new Error(updateResult.error);
    }

    return true;
  }

  @Query((returns) => Episode)
  async getEpisode(
    @Args('podcastId') podcastId: number,
    @Args('episodeId') episodeId: number,
  ): Promise<Episode> {
    const { episode, err } = await this.podcastsService.findEpisode(
      podcastId,
      episodeId,
    );
    if (err) {
      throw new Error(err);
    }
    return episode;
  }

  @Mutation((returns) => Boolean)
  async deleteEpisode(
    @Args('podcastId') podcastId: number,
    @Args('episodeId') episodeId: number,
  ): Promise<boolean> {
    const { error } = await this.podcastsService.deleteEpisode(
      podcastId,
      episodeId,
    );
    if (error) {
      throw new Error(error);
    }
    return true;
  }
}
