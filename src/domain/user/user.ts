import { AggregateRoot, eDataSource, GenericAppError, Result, UniqueEntityID } from '@softobiz-df/shared-lib'
import { Product } from '../product'
import { UserName } from './user-name'

interface UserProps {
	name: UserName
	products: Product[]
}
export class User extends AggregateRoot<UserProps> {
	//#region member variables
	//#endregion

	//#region constants
	//#endregion

	//#region properties
	//#endregion

	//#region private methods
	private constructor(props: UserProps, id?: UniqueEntityID) {
		super(props, id)
	}
	//#endregion
	public get name(): string {
		return this.props.name.UserName
	}
	//#region private setters
	private setName(name: UserName) {
		this._props.name = name
		return Result.ok(this)
	}
	//#endregion
	private setProduct(products: Product[]) {
		for (const product of products) {
			if (!(product instanceof Product)) {
				return Result.fail(new GenericAppError.DomainError('The customer name cannot hold less than five alphabets'))
			}
		}
		if (products.length > 2) {
			return Result.fail(new GenericAppError.DomainError('The customer cannot hold more than 2 products'))
		}
		this._props.products = products
		return Result.ok(this)
	}
	//#region public methods
	public static create(props: UserProps, id?: UniqueEntityID, dataSource?: eDataSource) {
		if (dataSource === eDataSource.STORAGE) return Result.ok(new User(props, id))
		const user = new User(Object.create(null), id)
		const validationQueue = [user.setName(props.name), user.setProduct(props.products)]
		const combinedResult = Result.combine(validationQueue)
		if (combinedResult.isFailure) return Result.fail<User>(new GenericAppError.DomainError(combinedResult.errorValue()))
		return Result.ok(user)
	}
	//#endregion
}
