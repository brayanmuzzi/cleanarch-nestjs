import { UserRepository } from '@/users/domain/repositories/user.repository'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { HashProvider } from '@/shared/application/providers/hash-provider'
import { UserOutput, UserOutputMapper } from '../dtos/user-output'
import { InvalidCredentialsError } from '@/shared/domain/errors/invalid-credentials-error'
import { UseCase as DefaultUseCase } from './use-case'
import { BadRequestError } from '@/shared/domain/errors/bad-request-error'

export namespace SigninUseCase {
  export type Input = {
    email: string
    password: string
  }

  export type Output = UserOutput

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepository: UserRepository.Repository,
      private hashProvider: HashProvider,
    ) {}

    async execute(input: Input): Promise<Output> {
      const { email, password } = input

      if (!email || !password) {
        throw new BadRequestError('Input data not provided')
      }

      const entity = await this.userRepository.findByEmail(email)

      const hashPasswordMatches = await this.hashProvider.compareHash(
        password,
        entity.password,
      )

      if (!hashPasswordMatches) {
        throw new InvalidCredentialsError('Invalid credentials')
      }

      return UserOutputMapper.toOutput(entity)
    }
  }
}
