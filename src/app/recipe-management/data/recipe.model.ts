export type Recipe = {
  id: string;
  name: string;
  description: string;
  categoryIds: string[];
  imagePath: string;
  ingredients: string[];
  instructions: string[];
};
