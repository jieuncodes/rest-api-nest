import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreatePodcastDto {
  @Field((type) => String)
  title: string;

  @Field((type) => String)
  category: string;
}
