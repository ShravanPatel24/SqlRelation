import { IRequest } from '@softobiz-df/shared-lib'
import { IsOptional } from 'class-validator'
import { UserCreateResponseType } from './user.response.type'
import { ApiProperty } from '@nestjs/swagger'

export class Product {
	@IsOptional()
	@ApiProperty()
	public name: string

	public constructor(init?: Partial<Product>) {
		Object.assign(this, init)
	}
}
export class UserCreateCommand implements IRequest<UserCreateResponseType> {
	@IsOptional()
	@ApiProperty()
	public name: string

	@IsOptional()
	@ApiProperty()
	public products: Product

	public constructor(init?: Partial<UserCreateCommand>) {
		Object.assign(this, init)
	}
}
