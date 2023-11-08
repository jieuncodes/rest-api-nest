import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class CreatePodcastDto {
  @Field((type) => String)
  @IsString()
  title: string;

  @Field((type) => String)
  @Field((type) => String)
  category: string;
}
