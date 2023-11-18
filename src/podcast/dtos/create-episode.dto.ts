import { ArgsType, Field, InputType, Int, PickType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { Episode } from '../entities/episode.entity';

@ArgsType()
export class CreateEpisodeDto extends PickType(
  Episode,
  ['title', 'category'],
  InputType,
) {
  @Field((type) => Int)
  @IsInt()
  podcastId: number;
}
