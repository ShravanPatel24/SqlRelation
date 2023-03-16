import { Injectable } from '@nestjs/common'
import { IDTO, IMapper } from '@softobiz-df/shared-lib'
import { User } from 'src/domain/user/user'
import { UserModel } from '../models/user.model'
import { ProductSqlMapper } from './product.mapper'

@Injectable()
export class UserSqlMapper implements IMapper {
	constructor(private productMapper: ProductSqlMapper) {}

	toDomain(raw: UserModel): User {
		// return User.create(
		// 	{
		// 		name: raw.name,
		// 	},
		// 	new UniqueEntityID(raw.uuid),
		// 	eDataSource.STORAGE,
		// ).getValue()
		throw new Error()
	}

	toPersistence(input: User, curEntity?: UserModel): UserModel {
		if (!curEntity) {
			curEntity = new UserModel()
		}
		curEntity.uuid = input.id.toString()
		curEntity.name = input.name
		curEntity.products = input.props.products.map((x) => this.productMapper.toPersistence(x))

		//@todo:: improve mapping
		return curEntity
	}
	toDto(input: UserModel): IDTO {
		throw new Error('Method not implemented.')
	}
}
