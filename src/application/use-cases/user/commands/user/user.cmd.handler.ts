import { Inject, Injectable } from '@nestjs/common'
import { AppLoggerService, GenericAppError, IRequestHandler, RecordIdModel, Result, UniqueEntityID } from '@softobiz-df/shared-lib'
import { Product } from 'src/domain/product'
import { User } from '../../../../../domain/user/user'
import { IUserRepository } from '../../../../../infrastructure/data-access/irepositories/iuser.repository'
import { UserCreateCommand } from './user.cmd'
import { UserCreateResponseType } from './user.response.type'

@Injectable()
export class UserCreateCommandHandler implements IRequestHandler<UserCreateCommand, UserCreateResponseType> {
	private readonly _logger = AppLoggerService.getLogger(UserCreateCommandHandler)

	constructor(@Inject(IUserRepository) private readonly _userRepo: IUserRepository) {}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async handle(commandOrQuery: UserCreateCommand, token?: string): Promise<UserCreateResponseType> {
		const products = Product.create({
			productName: commandOrQuery.products.name,
		})

		const productValue = products.getValue()

		const user = User.create(
			{
				name: commandOrQuery.name,
				products: [productValue],
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
