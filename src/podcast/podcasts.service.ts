import { Injectable } from '@nestjs/common';
import { CreateEpisodeDto } from './dtos/create-episode.dto';
import { CreatePodcastDto } from './dtos/create-podcast.dto';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';
import { UpdatePodcastDto } from './dtos/update-podcast.dto';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { CoreOutput } from './dtos/output.dto';
import {
  EpisodeSearchOutput,
  EpisodesSearchInput,
  PodcastSearchOutput,
} from './dtos/podcast.dto';

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [];

  getAllPodcasts(): Podcast[] {
    return this.podcasts;
  }

  createPodcast({ title, category }: CreatePodcastDto): CoreOutput {
    this.podcasts.push({
      id: this.podcasts.length + 1,
      title,
      category,
      rating: 0,
      episodes: [],
    });
    return { ok: true, error: null };
  }

  async getPodcast(id: number): Promise<PodcastSearchOutput> {
    const foundPodcasts = this.podcasts.filter((podcast) => podcast.id === id);

    if (!foundPodcasts) {
      return { ok: false, error: `Podcast with id ${id} not found` };
    }
    return { ok: true, podcast: foundPodcasts[0] };
  }

  async deletePodcast(id: number): Promise<CoreOutput> {
    const { ok, error } = await this.getPodcast(id);

    if (!ok) {
      return { ok, error };
    }
    this.podcasts = this.podcasts.filter((podcast) => podcast.id !== id);
    return { ok };
  }

  async updatePodcast(
    id: number,
    updatePodcastDto: UpdatePodcastDto,
  ): Promise<CoreOutput> {
    const { ok, error, podcast } = await this.getPodcast(id);
    if (!ok) {
      return { ok, error };
    }
    this.podcasts = this.podcasts.filter((p) => p.id !== id);
    this.podcasts.push({ ...podcast, ...updatePodcastDto });
    return { ok };
  }

  async getEpisodes(podcastId: number): Promise<EpisodeSearchOutput> {
    const { ok, podcast, error } = await this.getPodcast(podcastId);
    if (!ok) {
      return { ok, error };
    }
    return { ok: true, episodes: podcast.episodes, error: null };
  }

  async createEpisode({
    id: podcastId,
    title,
    category,
  }: CreateEpisodeDto): Promise<EpisodeSearchOutput> {
    const { ok, podcast, error } = await this.getPodcast(podcastId);

    if (!ok) {
      return { ok, error };
    }

    const newEpisode: Episode = {
      id: podcast.episodes.length + 1,
      title,
      category,
    };

    this.updatePodcast(podcastId, {
      ...podcast,
      episodes: [...podcast.episodes, newEpisode],
    });

    return { ok: true };
  }

  async deleteEpisode({
    podcastId,
    episodeId,
  }: EpisodesSearchInput): Promise<CoreOutput> {
    const { podcast, error, ok } = await this.getPodcast(podcastId);
    if (!ok) {
      return { ok, error };
    }
    this.updatePodcast(podcastId, {
      ...podcast,
      episodes: podcast.episodes.filter((episode) => episode.id !== episodeId),
    });
    return { ok: true };
  }

  async updateEpisode({
    podcastId,
    episodeId,
    ...rest
  }: UpdateEpisodeDto): Promise<CoreOutput> {
    const { podcast, error, ok } = await this.getPodcast(podcastId);

    if (!ok) {
      return { ok, error };
    }

    const episode = podcast.episodes.find((e) => e.id === episodeId);
    if (!episode) {
      return { ok: false, error: 'Episode not found' };
    }

    this.deleteEpisode({ podcastId, episodeId });
    const updatedEpisode = { ...episode, ...rest };
    this.updatePodcast(podcastId, {
      ...podcast,
      episodes: [...podcast.episodes, updatedEpisode],
    });

    return { ok: true };
  }
}
