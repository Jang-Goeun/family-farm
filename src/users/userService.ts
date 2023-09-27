import { UserDTO } from './dtos/users'
import { UserRepository } from './userRepository'
import { CreateUserDTO } from './dtos/createUserDTO'
import { GetUserDTO } from './dtos/getUserDTO'

export class UserService {
	private userRepo: UserRepository

	constructor(userRepo: UserRepository) {
		this.userRepo = userRepo
	}

	public async createUserService({ email, password }: CreateUserDTO): Promise<UserDTO> {
		const userRepository = await this.userRepo.createUser({ email, password })

		return userRepository
	}

	public async getUserService({ email }: GetUserDTO): Promise<UserDTO> {
		const userRepository = await this.userRepo.getUser(email)

		return userRepository
	}

	public async getUserById(id: number): Promise<UserDTO> {
		const userRepository = await this.userRepo.getUserById(id)

		return userRepository
	}

	public async getUserBySnsId({ sns_id }: GetUserDTO): Promise<UserDTO> {
		const userRepository = await this.userRepo.getUserBySnsId(sns_id)

		return userRepository
	}
}
