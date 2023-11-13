import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Episode {
  @Field((type) => Number)
  id: number;

  @Field((type) => String)
  title: string;

  @Field((type) => String, { nullable: true })
  category?: string;
}
