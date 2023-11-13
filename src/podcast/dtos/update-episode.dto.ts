import { Field, Int, ArgsType } from '@nestjs/graphql';
import { IsOptional, IsString, isNumber, Min } from 'class-validator';
import { EpisodesSearchInput } from './podcast.dto';

@ArgsType()
export class UpdateEpisodeDto extends EpisodesSearchInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  title?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  category?: string;
}
