import { Role } from './Role';

export type TokenData = {
  exp: number;
  sub: string;
  userId: string;
  authorities: Role[];
};
