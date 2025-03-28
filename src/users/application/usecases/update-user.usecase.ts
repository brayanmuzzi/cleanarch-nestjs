import { BadRequestError } from '@/shared/domain/errors/bad-request-error'
import { UserOutput, UserOutputMapper } from '../dtos/user-output'
import { UseCase as DefaultUseCase } from './use-case'
import { UserRepository } from '@/users/domain/repositories/user.repository'

export namespace UpdateUserUseCase {
  export type Input = {
    id: string
    name: string
  }

  export type Output = UserOutput

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.name) {
        throw new BadRequestError('Name not provided')
      }
      const entity = await this.userRepository.findById(input.id)
      entity.update(input.name)
      await this.userRepository.update(entity)
      return UserOutputMapper.toOutput(entity)
    }
  }
}
