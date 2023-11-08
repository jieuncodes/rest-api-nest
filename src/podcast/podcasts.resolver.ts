import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Podcast } from './entities/podcast.entity';
import { Episode } from './entities/episode.entity';
import { CreatePodcastDto } from './dtos/create-podcast.dto';

@Resolver((of) => Podcast)
export class PodcastsResolver {
  @Query((returns) => [Podcast])
  Podcasts(): Podcast[] {
    return [];
  }

  @Mutation((returns) => Boolean)
  createPodcast(@Args() createPodcastDto: CreatePodcastDto): boolean {
    console.log('createPodcastDto', createPodcastDto);
    return true;
  }
}
