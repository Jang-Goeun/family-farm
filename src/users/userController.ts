import { UserService } from './userService';
import { CreateUserDTO } from './dtos/createUserDTO';

export class UserController {
  private userService: UserService

  constructor(userService: UserService) {
    this.userService = userService
  }

  public async createUserController(dto: CreateUserDTO) {
    const createUserController = await this.userService.createUserService(dto)

    return createUserController
  }
}

export const getUserController = async () => {
  
}