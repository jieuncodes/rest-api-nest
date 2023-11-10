import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class EpisodeInput {
  @Field((type) => Number, { nullable: true })
  @IsOptional()
  id?: number;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  title?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  category?: string;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  rating?: number;
}
