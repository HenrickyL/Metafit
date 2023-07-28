# Terms:

Nesta aplicação vamos ter classes que mapeiam 3 tipos de interfaces/types, por meio disto, vamos precisar definir termos para padronizar a compreenção. 

```ts
interface IMapper<Entity,Model,DTO>{
  toEntity(model: Model): Entity;
  toModelAsync?(entity: Entity): Promise<Model>;
  toModel?(entity: Entity): Model;
  toResponse(entity: Entity): DTO;
}
```

* **Model:** O modelo vai se referenciar ao tipo gerado pela ORM, prisma no caso, que gera um tipo na pasta *node_modules/prima/client*. Logo, 

```ts
//Prisma Model
type User = {
  id: string
  name: string
  username: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}
```
* **Entity:** A entidade vai ser o tipo/interface que referência o modelo do banco na nossa aplicação, ele extende da interface IEntity, que carrega todos os campos em comum entre as outras entidades, como createdAt e Id. Utiliza-se interface nesse caso para facilitar o uso de extensões e implementações.Logo,

```ts
interface IEntity{
  id?: string
  createdAt?: Date;
  updatedAt?: Date;
}
```
```ts
interface IUser extends IEntity{
  username: string
  password: Password
  name:     string
  email:    string
}
```
* **DTO:** *Data Transference Object* são os tipos de entrada e saída da nossa aplicação, geralmente quando fazemos uma requisição temos um tipo de entrada, *RegisterUserRequest*, e um tipo de saída que retorna apenas os dados necessário que o endpoint deve retornar, *UserResponse*. Logo,

```ts
type UserResponse = {
  id: string
  username: string
  name: string
  email: string
  createdAt: Date
  updatedAt?: Date
}
```