import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const requestingUser = this.usersRepository.findById(user_id);

    if (requestingUser === undefined) {
      throw new Error("invalid user id");
    }

    const isUserAdmin = requestingUser.admin;

    if (!isUserAdmin) {
      throw new Error("you don't have permissions to make this action");
    }

    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
