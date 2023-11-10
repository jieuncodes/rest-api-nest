import { ArgsType, Field } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@ArgsType()
export class CreateEpisodeDto {
  @Field((type) => Number)
  @IsInt()
  podcastId: number;

  @Field((type) => String)
  @IsString()
  title: string;

  @Field((type) => String, { nullable: true })
  @IsString()
  category?: string;
}
