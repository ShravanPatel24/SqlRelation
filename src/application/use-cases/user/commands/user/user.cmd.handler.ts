import { Inject, Injectable } from '@nestjs/common'
import { AppLoggerService, GenericAppError, IRequestHandler, RecordIdModel, Result, UniqueEntityID } from '@softobiz-df/shared-lib'
import { Product } from 'src/domain/product'
import { UserName } from 'src/domain/user/user-name'
import { User } from '../../../../../domain/user/user'
import { IUserRepository } from '../../../../../infrastructure/data-access/irepositories/iuser.repository'
import { UserCreateCommand } from './user.cmd'
import { UserCreateResponseType } from './user.response.type'

@Injectable()
export class UserCreateCommandHandler implements IRequestHandler<UserCreateCommand, UserCreateResponseType> {
	private readonly _logger = AppLoggerService.getLogger(UserCreateCommandHandler)

	constructor(@Inject(IUserRepository) private readonly _userRepo: IUserRepository) {}
	async handle(commandOrQuery: UserCreateCommand, token?: string): Promise<UserCreateResponseType> {
		const products = [
			{
				product_id_name: 'Iphone',
			},
			{
				product_id_name: 'Laptop',
			},
		]

		const userNameResult = UserName.create({ name: commandOrQuery.name })
		console.log(userNameResult.isFailure)

		if (userNameResult.isFailure) {
			return Result.fail(new GenericAppError.ValidationError(userNameResult.message))
		}

		// const userID = User.create(null)

		const productResultList = []
		for (const product of products) {
			const productResult: Result<Product> = Product.create({
				productName: product.product_id_name,
				user: undefined,
			})
			productResultList.push(productResult)
			console.log(productResult)
		}

		const validateProductResult = Result.combine(productResultList)
		if (validateProductResult.isFailure) {
			return Result.fail(validateProductResult.message)
		}

		const user = User.create(
			{
				name: userNameResult.getValue(),
				products: productResultList.map((x: Result<Product>) => x.getValue()),
			},
			new UniqueEntityID(),
		)
		// if (user.isFailure) return Result.fail(userNameResult.getValue()
		if (user.isFailure) return Result.fail(new GenericAppError.ValidationError('Product is not valid'))

		const userValue = user.getValue()
		await this._userRepo.save(userValue)

		return Result.ok(new RecordIdModel({ id: userValue.id.toString() }))
	}
}
