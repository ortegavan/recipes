import { mockSession } from '../../auth/data/session.mock';
import { User } from './user.model';

export const mockUser: User = {
    id: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Teste',
    email: 'teste@teste.com',
    birthday: new Date(),
    password: '123456',
    session: mockSession[0],
};
