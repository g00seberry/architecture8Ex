import { UserDto } from "./dto/UserDto";

export type UserAuthResponse = {
  user: UserDto;
  refreshToken: string;
  accessToken: string;
};
