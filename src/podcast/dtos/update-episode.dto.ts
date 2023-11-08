import { ArgsType, Field } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@ArgsType()
export class UpdateEpisodeDto {
  @Field((type) => String)
  @IsString()
  title?: string;

  @Field((type) => String)
  @IsString()
  category: string;

  @Field((type) => Number)
  @IsInt()
  rating: number;
}
