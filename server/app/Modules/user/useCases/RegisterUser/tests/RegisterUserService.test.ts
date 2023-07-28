import { PrismaUsersRepository } from '@modules/user/repositories/prisma/PrismaUserRepository';
import {RegisterUserService} from '../RegisterUserService'
import { RegisterUserRequest, UserResponse } from '@core/domain/DTOs/userDTO';
import { createMock } from 'ts-auto-mock';
// Arrange

// Act

// Assert 

/// TODO Exemple
describe("Register User Service Tests", () => {
  let userRepo: PrismaUsersRepository;
  beforeEach(() => {
    userRepo = createMock<PrismaUsersRepository>();
  });
    test("createUser should create a new user", async () => {
      //Arrange
      const service = new RegisterUserService(userRepo)

        // Mock data
      const userData: RegisterUserRequest  = {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "myPassword0123",
        username: "JohnDoe"
      };
      // Act
      const result = await service.execute(userData);
      // Assert
      expect(userRepo.create).toHaveBeenCalled();
      expect(result)
        .toContain(expect.objectContaining({
        name: "John Doe",
        email: "johndoe@example.com",
        username: "JohnDoe"
      }));
    });

    
  
  });
