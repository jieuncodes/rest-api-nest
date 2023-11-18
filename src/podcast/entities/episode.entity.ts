import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@ObjectType()
@InputType('EpisodeInput', { isAbstract: true })
export class Episode {
  @Field((type) => Int)
  @IsInt()
  id: number;

  @Field((type) => String)
  title: string;

  @Field((type) => String, { nullable: true })
  category?: string;
}
