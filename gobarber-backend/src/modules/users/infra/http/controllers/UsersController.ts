import { Request, Response } from 'express';
import { container } from 'tsyringe';
import * as HttpStatus from 'http-status-codes';
import CreateUserService from '@modules/users/services/CreateUserService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name, email, password,
    });

    /* We should never return a user's password in the request.
     * Not a good practice, even if it is encrypted. So we remove it here.*/
    delete user.password;

    return response.status(HttpStatus.OK).json(user);
  }
}

export default UsersController;