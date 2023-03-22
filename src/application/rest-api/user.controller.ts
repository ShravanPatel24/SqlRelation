import { Body, Controller, Get, Post } from '@nestjs/common'
import { IMediator, Result } from '@softobiz-df/shared-lib'
import { UserCreateCommand } from '../use-cases/user/commands/user/user.cmd'
import { UserCreateResponseType } from '../use-cases/user/commands/user/user.response.type'
import { ApiQuery, ApiTags } from '@nestjs/swagger'

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(private readonly _mediator: IMediator) {}

	@Post('create')
	async createUser(@Body() payload: UserCreateCommand): Promise<UserCreateResponseType> {
		return this._mediator.send<UserCreateResponseType>(new UserCreateCommand(payload))
	}

	@ApiQuery({ name: 'id', description: 'Gets the Action id' })
	@Get('health')
	async getHealth(): Promise<Result<string>> {
		return Result.ok(' Service running ')
	}
}
