export interface IMapper<Entity,Model>{
  toEntity(model: Model, populate?:boolean): Entity;
  toModelAsync?(entity: Entity): Promise<Model>;
  toModel?(entity: Entity): Model;
}