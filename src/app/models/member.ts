import { Deal } from "./deal";

export interface Member{
  title: string;
  username: string;
  deals: Deal[];
}
