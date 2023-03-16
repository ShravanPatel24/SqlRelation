import { Module } from '@nestjs/common'
import { UserSqlMapper } from './mappers'
import { IUserRepository } from '../irepositories'
import { UserSqlRepository } from './user.repository'
import { ProductSqlMapper } from './mappers'

@Module({
	providers: [UserSqlMapper, ProductSqlMapper, UserSqlRepositoryModule, { provide: IUserRepository, useClass: UserSqlRepository }],
	exports: [{ provide: IUserRepository, useClass: UserSqlRepository }],
})
export class UserSqlRepositoryModule {}
