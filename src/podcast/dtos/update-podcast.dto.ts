import {
  ArgsType,
  Field,
  InputType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { Episode } from '../entities/episode.entity';

@ArgsType()
export class UpdatePodcastDto extends PartialType(
  PickType(Episode, ['title', 'category'], InputType),
) {
  @Field(() => [Episode], { nullable: true })
  episodes?: Episode[];
}
