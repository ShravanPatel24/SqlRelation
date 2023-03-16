import { ValueObject, Result, GenericAppError } from '@softobiz-df/shared-lib'

interface IUserNameProps {
	// isAuth: boolean
	name: string
}
/**
 * The UserName Class
 *
 * @export
 * @class UserName
 * @extends {ValueObject<IUserNameProps>}
 */
export class UserName extends ValueObject<IUserNameProps> {
	/**
	 * Creates an instance of UserName.
	 * @param {IUserNameProps} props
	 * @memberof UserName
	 */
	private constructor(props: IUserNameProps) {
		super(props)
	}

	public get UserName(): string {
		return this.props.name
	}

	/**
	 * Creates and initializes object for the UserName Class using the private constructor after validations
	 *
	 * @static
	 * @param {IUserNameProps} props
	 * @returns {Result<UserName>}
	 * @memberof UserName
	 */
	public static create(props: IUserNameProps): Result<UserName> {
		if (props.name.length < 5) {
			return Result.fail(new GenericAppError.ValidationError('The name should be more than 5 letters'))
		}
		const User = new UserName({ name: props.name })

		return Result.ok(User)
	}
}
