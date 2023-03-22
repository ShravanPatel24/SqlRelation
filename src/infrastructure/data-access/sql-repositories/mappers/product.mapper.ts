import { Injectable } from '@nestjs/common'
import { eDataSource, IDTO, IMapper, UniqueEntityID } from '@softobiz-df/shared-lib'
import { Product } from 'src/domain/product/product'
import { ProductModel } from '../models/product.model'

@Injectable()
export class ProductSqlMapper implements IMapper {
	constructor() {}

	toDomain(raw: ProductModel): Product {
		return Product.create(
			{
				productName: raw.name,
			},
			new UniqueEntityID(raw.uuid),
			eDataSource.STORAGE,
		).getValue()
	}

	toPersistence(input: Product, curEntity?: ProductModel): ProductModel {
		if (!curEntity) {
			curEntity = new ProductModel()
		}
		curEntity.uuid = input.getProductID.toString()
		curEntity.name = input.props.productName

		//@todo:: improve mapping
		return curEntity
	}
	toDto(input: ProductModel): IDTO {
		throw new Error('Method not implemented.')
	}
}
