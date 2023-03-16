import { Module } from '@nestjs/common'
import { ProductSqlMapper } from './mappers/product.mapper'
import { IProductRepository } from '../irepositories/iproduct.repository'
import { ProductSqlRepository } from './product.repository'

@Module({
	providers: [ProductSqlMapper, ProductSqlRepositoryModule, { provide: IProductRepository, useClass: ProductSqlRepository }],
	exports: [{ provide: IProductRepository, useClass: ProductSqlRepository }],
})
export class ProductSqlRepositoryModule {}
