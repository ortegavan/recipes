import { mockCategories } from '../data/categories.mock';
import { CategoryNamePipe } from './category-name.pipe';

describe('CategoryNamePipe', () => {
    let pipe: CategoryNamePipe;

    beforeEach(() => {
        pipe = new CategoryNamePipe();
    });

    it('deve retornar o nome correto da categoria para um id válido', () => {
        const categoryName = pipe.transform(['1'], mockCategories);
        expect(categoryName).toBe('Prato principal');
    });

    it('deve retornar string vazia para um id inválido', () => {
        const categoryName = pipe.transform(['99'], mockCategories);
        expect(categoryName).toBe('');
    });

    it('deve retornar string vazia se não for fornecido o array de categorias', () => {
        const categoryName = pipe.transform(['1'], undefined);
        expect(categoryName).toBe('');
    });
});
