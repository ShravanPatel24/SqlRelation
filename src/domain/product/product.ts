import { eDataSource, GenericAppError, Result, UniqueEntityID, Entity } from '@softobiz-df/shared-lib'
import { User } from '../user'

interface ProductProps {
	productName: string
	user: User
}
export class Product extends Entity<ProductProps> {
	//#region member variables
	//#endregion

	//#region constants
	//#endregion

	//#region properties
	//#endregion

	//#region private methods
	private constructor(props: ProductProps, id?: UniqueEntityID) {
		super(props, id)
	}
	//#endregion
	public get getProductID(): UniqueEntityID {
		return this._id
	}

	public get getCustomerID(): UniqueEntityID {
		return this._id
	}
	//#region private setters
	private setName(name: string) {
		this._props.productName = name
		return Result.ok(this)
	}
	//#endregion
	private setUser(user: User) {
		this._props.user = user
		return Result.ok(this)
	}
	//#region public methods
	public static create(props: ProductProps, id?: UniqueEntityID, dataSource?: eDataSource) {
		if (dataSource === eDataSource.STORAGE) return Result.ok(new Product(props, id))
		const product = new Product(Object.create(null), id)
		const validationQueue = [product.setName(props.productName), product.setUser(props.user)]
		const combinedResult = Result.combine(validationQueue)
		if (combinedResult.isFailure) return Result.fail<Product>(new GenericAppError.DomainError(combinedResult.errorValue()))
		return Result.ok(product)
	}
	//#endregion
}
