import { Comment } from './comment.model';

export const mockComments: Comment[] = [
    {
        id: '1',
        createdAt: new Date(),
        recipeId: '1',
        userId: '1',
        userName: 'Alice',
        rating: 5,
        comment: 'Essa receita é ótima!',
    },
    {
        id: '2',
        createdAt: new Date(),
        recipeId: '1',
        userId: '2',
        userName: 'Bob',
        rating: 4,
        comment: 'Eu gostei, mas coloquei mais sal.',
    },
];
