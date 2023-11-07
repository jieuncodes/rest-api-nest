import { IsInt, IsPositive, IsString, Min } from 'class-validator';
export class CreatePodcastDto {
  @IsString()
  title: string;
  @IsString()
  category: string;

  @IsInt()
  @IsPositive()
  @Min(1)
  rating: number;
}
