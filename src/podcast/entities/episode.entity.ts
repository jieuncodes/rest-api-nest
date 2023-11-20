import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, ManyToOne } from 'typeorm';
import { CoreEntity } from './core.entity';
import { IsString } from 'class-validator';
import { Podcast } from './podcast.entity';

@ObjectType()
@InputType('EpisodeInput', { isAbstract: true })
export class Episode extends CoreEntity {
  @Column()
  @Field(() => String)
  @IsString()
  title: string;

  @Column()
  @Field(() => String, { nullable: true })
  @IsString()
  category?: string;

  @ManyToOne(() => Podcast, (podcast) => podcast.episodes, {
    onDelete: 'CASCADE',
  })
  @Field(() => Podcast)
  podcast: Podcast;
}
