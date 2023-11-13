import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { PodcastSearchInput } from './podcast.dto';

@ArgsType()
export class CreateEpisodeDto extends PodcastSearchInput {
  @Field((type) => String)
  @IsString()
  title: string;

  @Field((type) => String, { nullable: true })
  @IsString()
  category?: string;
}
