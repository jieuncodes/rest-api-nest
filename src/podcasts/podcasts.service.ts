import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePodcastDto } from './dto/create-podcast.dto';
import { UpdatePodcastDto } from './dto/update-podcast.dto';
import { Podcast } from './entities/podcast.entity';
import { CreateEpisodeDto } from './dto/create-episode.dto';

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [];

  create(createPodcastDto: CreatePodcastDto) {
    return 'This action adds a new podcast';
  }

  findAll() {
    return this.podcasts;
  }

  findOne(id: number) {
    const podcast = this.podcasts.find((podcast) => podcast.id === id);
    if (!podcast) {
      throw new NotFoundException(`Podcast with ID ${id} not found.`);
    }
    return podcast;
  }

  update(id: number, updatePodcastDto: UpdatePodcastDto) {
    const podcastIdx = this.podcasts.findIndex((podcast) => podcast.id === id);
    if (podcastIdx === -1) {
      throw new NotFoundException(`Podcast with ID ${id} not found.`);
    }
    const existingPodcast = this.podcasts[podcastIdx];
    this.podcasts[podcastIdx] = {
      ...existingPodcast,
      ...updatePodcastDto,
    };
    return this.podcasts[podcastIdx];
  }

  remove(id: number) {
    const podcastIndex = this.podcasts.findIndex(
      (podcast) => podcast.id === id,
    );
    if (podcastIndex === -1) {
      throw new NotFoundException(`Podcast #${id} not found`);
    }
    this.podcasts.splice(podcastIndex, 1);
  }

  findEpisodes(podcastId: number) {
    const episodes = this.findOne(podcastId).episodes;
    if (!episodes) {
      throw new NotFoundException(
        `Episodes for podcast #${podcastId} not found`,
      );
    }
    return episodes;
  }

  createEpisode(podcastId: number, createEpisodeDto: CreateEpisodeDto) {
    const podcast = this.findOne(podcastId);
    podcast.episodes.push({
      id: podcast.episodes.length + 1,
      ...createEpisodeDto,
    });
  }

  updateEpisode(podcastId: number, episodeId: number, updateEpisodeDto: any) {
    const podcast = this.findOne(podcastId);
    const episodeIdx = podcast.episodes.findIndex(
      (episode) => episode.id === episodeId,
    );
    if (episodeIdx === -1) {
      throw new NotFoundException(`Episode #${episodeId} not found`);
    }
    const existingEpisode = podcast.episodes[episodeIdx];
    podcast.episodes[episodeIdx] = {
      ...existingEpisode,
      ...updateEpisodeDto,
    };
  }
  deleteEpisode(podcastId: number, episodeId: number) {
    const podcast = this.findOne(podcastId);
    podcast.episodes = podcast.episodes.filter(
      (episode) => episode.id !== episodeId,
    );
  }
}
