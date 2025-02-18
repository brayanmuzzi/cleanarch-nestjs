import { UserRepository } from '@/users/domain/repositories/user.repository'
import { UserOutput } from '../dtos/user-output'
import { UseCase as DefaultUseCase } from './use-case'
import { SearchInput } from '../dtos/search-input'

export namespace ListUsersUseCase {
  export type Input = SearchInput

  export type Output = void

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.Repository) {}
    async execute(input: Input): Promise<Output> {
      const params = new UserRepository.SearchParams(input)
      const searchResult = await this.userRepository.search(params)
      return
    }
  }
}
