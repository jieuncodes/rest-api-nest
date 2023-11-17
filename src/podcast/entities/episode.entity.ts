import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType('EpisodeInput', { isAbstract: true })
export class Episode {
  @Field((type) => Number)
  id: number;

  @Field((type) => String)
  title: string;

  @Field((type) => String, { nullable: true })
  category?: string;
}
