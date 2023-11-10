import { InputType, Field, Int, ArgsType } from '@nestjs/graphql';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';

@ArgsType()
export class UpdateEpisodeDto {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  podcastId: number;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  episodeId: number;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  title?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  category?: string;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  rating?: number;
}
