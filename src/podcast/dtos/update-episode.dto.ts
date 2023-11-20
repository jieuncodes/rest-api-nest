import { Field, ArgsType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { EpisodesSearchInput } from './podcast.dto';

@ArgsType()
export class UpdateEpisodeDto extends EpisodesSearchInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  title?: string;
  //readonly?

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  category?: string;
  //readonly?
}
