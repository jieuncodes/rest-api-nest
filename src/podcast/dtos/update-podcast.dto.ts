import { ArgsType, Field } from '@nestjs/graphql';
import { Episode } from '../entities/episode.entity';
import { IsInt, IsString } from 'class-validator';
import { EpisodeInput } from './episode-input.dto';

@ArgsType()
export class UpdatePodcastDto {
  @Field((type) => String, { nullable: true })
  @IsString()
  title?: string;

  @Field((type) => String, { nullable: true })
  @IsString()
  category?: string;

  @Field((type) => Number, { nullable: true })
  @IsInt()
  rating?: number;

  @Field((type) => [EpisodeInput], { nullable: true })
  @IsString({ each: true })
  episodes?: EpisodeInput[];
}
