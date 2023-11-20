import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreOutput } from './output.dto';
import { Podcast } from '../entities/podcast.entity';
import { Episode } from '../entities/episode.entity';

@InputType()
export class PodcastSearchInput extends PickType(Podcast, ['id'], InputType) {}

@ObjectType()
export class PodcastSearchOutput extends CoreOutput {
  @Field(() => Podcast, { nullable: true })
  podcast?: Podcast;
}

@ObjectType()
export class GetAllPodcastsOutput extends CoreOutput {
  @Field(() => [Podcast], { nullable: true })
  podcasts?: Podcast[];
}

@ObjectType()
export class EpisodeSearchOutput extends CoreOutput {
  @Field(() => [Podcast], { nullable: true })
  episodes?: Episode[];
}

@InputType()
export class EpisodesSearchInput {
  @Field(() => Number)
  @IsNumber()
  podcastId: number;

  @Field(() => Number)
  @IsNumber()
  episodeId: number;
}
