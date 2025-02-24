import { UserRepository } from '@/users/domain/repositories/user.repository'
import { UseCase as DefaultUseCase } from './use-case'
import {
  UserOutputMapper,
  UserOutput,
} from '@/users/application/dtos/user-output'

export namespace GetUserUseCase {
  export type Input = {
    id: string
  }
  export type Output = UserOutput
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.Repository) {}
    async execute(input: Input): Promise<Output> {
      const entity = await this.userRepository.findById(input.id)
      return UserOutputMapper.toOutput(entity)
    }
  }
}
