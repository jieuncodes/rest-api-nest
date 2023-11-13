import { ArgsType, Field } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PodcastSearchInput } from './podcast.dto';
import { Episode } from '../entities/episode.entity';

//isAbstract?
@ArgsType()
export class UpdatePodcastDto extends PodcastSearchInput {
  @Field((type) => String, { nullable: true })
  @IsString()
  @IsOptional()
  title?: string;

  @Field((type) => String, { nullable: true })
  @IsString()
  @IsOptional()
  category?: string;

  @Field((type) => Number, { nullable: true })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @Field((type) => [Episode], { nullable: true })
  episodes?: Episode[];
}
