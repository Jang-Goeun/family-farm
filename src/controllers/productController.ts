import { CustomExpressRequest } from '../../shared/lib/expressRequest'
import { CreateProductDTO } from '../dtos/products/createProductDTO'
import { UserRepository } from '../repositorys/userRepository'
import { productService } from '../services'
import express from 'express'

export class ProductController {
	private userRepository: UserRepository

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository
	}

	public async createProduct(req: CustomExpressRequest, res: express.Response) {
		const user_id = req.auth.id

		const dto: CreateProductDTO = { user_id, ...req.body }

		const result = await productService.createProduct(dto)

		return res.status(200).send(result)
	}

	public async getProduct(req: CustomExpressRequest, res: express.Response) {
		const id = req.params.id

		const result = await productService.getProduct(+id)

		return res.status(200).send(result)
	}

	public async getProductsByUserId(req: CustomExpressRequest, res: express.Response) {
		const user_id = req.auth.id

		const result = await productService.getProductsByUserId(user_id)

		return res.status(200).send(result)
	}
}