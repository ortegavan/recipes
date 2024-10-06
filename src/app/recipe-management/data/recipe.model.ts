export type Recipe = {
  id: number;
  name: string;
  description: string;
  categoryIds: number[];
  imagePath: string;
  ingredients: string[];
  instructions: string[];
};
