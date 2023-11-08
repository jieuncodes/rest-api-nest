import { Field, InputType } from '@nestjs/graphql';
import { Episode } from '../entities/episode.entity';
import { IsInt, IsString } from 'class-validator';

@InputType()
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

  @Field((type) => [Episode], { nullable: true })
  @IsString({ each: true })
  episodes?: Episode[];
}
