import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Podcast } from './entities/podcast.entity';
import { Episode } from './entities/episode.entity';
import { CreatePodcastDto } from './dtos/create-podcast.dto';
import { PodcastsService } from './podcasts.service';
import { UpdatePodcastDto } from './dtos/update-podcast.dto';
import { create } from 'domain';
import { CreateEpisodeDto } from './dtos/create-episode.dto';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';

@Resolver((of) => Podcast)
export class PodcastsResolver {
  constructor(private podcastsService: PodcastsService) {}

  @Query((returns) => [Podcast])
  async getAllPodcasts(): Promise<Podcast[]> {
    const { podcasts, err } = await this.podcastsService.getAllPodcasts();
    if (err) {
      throw new Error(err);
    }
    return podcasts;
  }

  @Mutation((returns) => Podcast)
  async createPodcast(
    @Args('createPodcastInput') createPodcastDto: CreatePodcastDto,
  ): Promise<Podcast> {
    const { id, err } =
      await this.podcastsService.createPodcast(createPodcastDto);
    if (err) {
      throw new Error('Error creating Podcast: ' + err);
    }
    if (!id) {
      throw new Error('Failed to create a podcast for unknown reasons.');
    }
    return this.getPodcast(id);
  }

  @Query((returns) => Podcast, { nullable: true })
  async getPodcast(@Args('id') id: number): Promise<Podcast> {
    const { podcast, err } = await this.podcastsService.getPodcast(id);
    if (err) {
      throw new Error(err);
    }
    return podcast;
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
    const { episodes, err } = await this.podcastsService.getEpisodes(id);
    if (err) {
      throw new Error(err);
    }
    return episodes;
  }

  @Mutation((returns) => Episode)
  async createEpisode(
    @Args() createEpisodeDto: CreateEpisodeDto,
  ): Promise<Episode> {
    const createdResult = this.podcastsService.createEpisode(createEpisodeDto);

    if (createdResult.err) {
      throw new Error(createdResult.err);
    }

    if (!createdResult.episodeId) {
      throw new Error('Failed to create an episode for unknown reasons.');
    }
    const findEpisodeResult = await this.podcastsService.findEpisode(
      createEpisodeDto.podcastId,
      createdResult.episodeId,
    );

    if (findEpisodeResult.err) {
      throw new Error('Failed to retrieve the created episode.');
    }

    return findEpisodeResult.episode;
  }

  @Mutation((returns) => Boolean)
  async updateEpisode(
    @Args() updateEpisodeDto: UpdateEpisodeDto,
  ): Promise<boolean> {
    const { podcastId, episodeId } = updateEpisodeDto;

    const { episode, err: episodeFindErr } = this.podcastsService.findEpisode(
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
    if (updateResult.err) {
      throw new Error(updateResult.err);
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
    const { err } = await this.podcastsService.deleteEpisode(
      podcastId,
      episodeId,
    );
    if (err) {
      throw new Error(err);
    }
    return true;
  }
}
