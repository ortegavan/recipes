export type Comment = {
    id: string;
    createdAt: Date;
    recipeId: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
};
