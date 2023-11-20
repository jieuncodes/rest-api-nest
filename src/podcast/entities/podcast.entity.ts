import { IsNumber, IsString, Max, Min } from 'class-validator';
import { Episode } from './episode.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from './core.entity';
import { Column, OneToMany } from 'typeorm';

@ObjectType()
export class Podcast extends CoreEntity {
  @Column()
  @Field(() => String)
  @IsString()
  title: string;

  @Column()
  @Field(() => String)
  @IsString()
  category: string;

  @Column()
  @Field(() => Number)
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @OneToMany(() => Episode, (episode) => episode.podcast)
  @Field(() => [Episode])
  episodes: Episode[];
}
