import { FirstLetterPipe } from './first-letter.pipe';

describe('FirstLetterPipe', () => {
    let pipe: FirstLetterPipe;

    beforeEach(() => {
        pipe = new FirstLetterPipe();
    });

    it('deve retornar a primeira letra de uma string', () => {
        const firstLetter = pipe.transform('Teste');
        expect(firstLetter).toBe('T');
    });

    it('deve retornar string vazia se for fornecida uma string vazia', () => {
        const firstLetter = pipe.transform('');
        expect(firstLetter).toBe('');
    });
});
