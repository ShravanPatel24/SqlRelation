import { Column, Entity, OneToMany } from 'typeorm'
import { BaseModel } from './base.model'
import { ProductModel } from './product.model'

@Entity({ name: 'SUser' })
export class UserModel extends BaseModel {
	//#region constructors
	public constructor(init?: Partial<UserModel>) {
		super()
		Object.assign(this, init)
	}
	//#endregion
	@Column()
	public name: string

	@OneToMany(() => ProductModel, (product) => product.user)
	public products: ProductModel[]
}
