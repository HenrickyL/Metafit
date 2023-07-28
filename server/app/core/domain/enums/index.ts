export enum SortOrder{
    ASC = 'asc',
    DESC = 'desc'
}

export enum SortRetrieveAllUserFields{
    name = 'name',
    username = 'username',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt'
}

export enum SortRetrieveAllCategoriesFields{
    name = 'name',
}

export enum SortRetrieveGroupsFields{
    name = 'name',
    isPrivate = 'isPrivate',
    owner = 'owner',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
    categories = 'categories'
}
export enum FilterRetrieveGroupsFields{
    name = 'name',
    isPrivate = 'isPrivate',
    description = 'description',
    owner = 'owner',
    member = 'member',
    categoryId = 'categoryId',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
}

// export function converterEnum(origem: any, destino: any): any {
//     const enumKeys = Object.keys(origem);
//     const enumValues = Object.values(origem);
  
//     const novoEnum = {} as any;
  
//     for (let i = 0; i < enumKeys.length; i++) {
//       novoEnum[enumKeys[i]] = enumValues[i];
//     }

//     Object.defineProperty(destino, origem[0], {
//         value: novoEnum,
//         enumerable: true,
//       });
  
//     return destino;
//   }