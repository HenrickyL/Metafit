import { IUser } from './IUser';
import { IGroup } from './IGroup';
import { IAchievement } from './IAchievement';
import { IGoal } from './IGoal';
import { IGroupMember } from './auxiliar/IGroupMember';
import { ICategory } from './ICategory';
import { IGroupCategory } from './auxiliar/IGroupCategory';



interface IEntity{
  id?: string
  createdAt?: Date;
  updatedAt?: Date;
}
export {
  IEntity,
  IUser,
  IGroup,
  IAchievement,
  IGoal,
  IGroupMember,
  ICategory,
  IGroupCategory
}
