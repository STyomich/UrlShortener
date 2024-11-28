import { User } from "../identity/user";

export interface ShortUrl {
  id: string;
  userId: string;
  originalUrl: string;
  urlKey: string;
  createdAt: Date;
  user: User;
}
export interface ShortUrlDto {
  originalUrl: string;
}
