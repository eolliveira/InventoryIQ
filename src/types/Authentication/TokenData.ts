import { Role } from './Role';

export type TokenData = {
  exp: number;
  sub: string;
  authorities: Role[];
};
