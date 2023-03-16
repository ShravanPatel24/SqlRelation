import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseModel } from './base.model'
import { UserModel } from './user.model'

@Entity({ name: 'Product' })
export class ProductModel extends BaseModel {
	//#region constructors
	public constructor(init?: Partial<ProductModel>) {
		super()
		Object.assign(this, init)
	}
	//#endregion

	@Column()
	public product_name: string

	@ManyToOne(() => UserModel, (user) => user.products)
	user: UserModel
}
