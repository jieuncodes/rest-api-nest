import { InputType } from '@nestjs/graphql';
import { Episode } from '../entities/episode.entity';

@InputType()
export class UpdatePodcastDto {
  readonly title?: string;
  readonly category?: string;
  readonly rating?: number;
  readonly episodes?: Episode[];
}
