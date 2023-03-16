import { Injectable } from '@nestjs/common'
import { Result, UniqueEntityID } from '@softobiz-df/shared-lib'
import { EntityManager, IsNull, Not } from 'typeorm'
import { Product } from 'src/domain/product/product'
import { IProductRepository } from '../irepositories/iproduct.repository'
import { ProductSqlMapper } from './mappers/product.mapper'
import { ProductModel } from './models/product.model'

@Injectable()
export class ProductSqlRepository implements IProductRepository {
	//#region constructor
	public constructor(private readonly _entityManager: EntityManager, private readonly _mapper: ProductSqlMapper) {}
	//#region private methods

	private async getById(uuid: string) {
		return this._entityManager.findOne(ProductModel, { uuid: uuid, deletedOn: Not(IsNull()) })
	}

	//#endregion
	private async getAll() {
		return this._entityManager.find(ProductModel, {})
	}

	findByProduct(_input: string): Promise<Result<Product>> {
		throw new Error('Method not implemented.')
	}
	//#endregion

	async save(input: Product): Promise<Result<Product>> {
		const persistence = this._mapper.toPersistence(input)
		await this._entityManager.transaction(async (em) => {
			await em.save(persistence)
		})
		return Result.ok(input)
	}
	exists(input: Product): Promise<Result<boolean>> {
		throw new Error('Method not implemented.')
	}
	remove(input: UniqueEntityID): Promise<Result<void>> {
		throw new Error('Method not implemented.')
	}
	async findById(input: UniqueEntityID): Promise<Result<Product>> {
		const productEntity = await this.getById(input.toString())
		if (productEntity) {
			return Result.ok(this._mapper.toDomain(productEntity))
		} else {
			return Result.ok()
		}
	}
}
