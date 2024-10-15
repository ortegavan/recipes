export type Recipe = {
  id: string;
  name: string;
  description: string;
  categoryIds: number[];
  imagePath: string;
  ingredients: string[];
  instructions: string[];
  new: boolean;
};
