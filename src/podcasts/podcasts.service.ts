import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePodcastDto } from './dto/create-podcast.dto';
import { UpdatePodcastDto } from './dto/update-podcast.dto';
import { Podcast } from './entities/podcast.entity';

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
}
