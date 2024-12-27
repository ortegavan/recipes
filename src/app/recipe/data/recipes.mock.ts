import { Recipe } from './recipe.model';

export const mockRecipes: Recipe[] = [
    {
        id: '1',
        name: 'Espaguete com tomatinhos cereja e manjericão',
        description:
            'Uma receita simples e deliciosa de espaguete com tomatinhos cereja frescos e manjericão.',
        categoryIds: ['1'],
        imagePath:
            'https://images.pexels.com/photos/11654225/pexels-photo-11654225.jpeg',
        ingredients: [
            '200g de espaguete',
            '300g de tomatinhos cereja cortados ao meio',
            '2 dentes de alho picados',
            '3 colheres de sopa de azeite de oliva',
            '1/2 xícara de folhas de manjericão fresco',
            'Sal e pimenta a gosto',
            'Queijo parmesão ralado a gosto',
        ],
        instructions: [
            'Cozinhe o espaguete em água salgada conforme as instruções da embalagem até ficar al dente.',
            'Enquanto isso, aqueça o azeite em uma frigideira grande e refogue o alho até dourar levemente.',
            'Adicione os tomatinhos cereja e cozinhe por cerca de 5 minutos, até começarem a amolecer.',
            'Tempere com sal e pimenta a gosto.',
            'Escorra o espaguete e adicione à frigideira com os tomates.',
            'Misture bem, adicione o manjericão e mexa rapidamente.',
            'Sirva com queijo parmesão ralado por cima.',
        ],
        new: false,
    },
    {
        id: '2',
        name: 'Toast de avocado com ovos cozidos',
        description:
            'Uma opção deliciosa e saudável de café da manhã ou lanche, com fatias de pão tostado, avocado cremoso e ovos cozidos.',
        categoryIds: ['2', '3'],
        imagePath:
            'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg',
        ingredients: [
            '2 fatias de pão integral',
            '1 avocado maduro',
            '2 ovos',
            '1 colher de chá de suco de limão',
            'Sal e pimenta a gosto',
            'Folhas de coentro ou salsinha para decorar',
        ],
        instructions: [
            'Cozinhe os ovos em água fervente por cerca de 8 a 10 minutos, até que fiquem duros. Descasque e corte ao meio.',
            'Enquanto os ovos cozinham, torre as fatias de pão até ficarem douradas e crocantes.',
            'Amasse o avocado em uma tigela com o suco de limão, e tempere com sal e pimenta a gosto.',
            'Espalhe o avocado amassado sobre as fatias de pão torrado.',
            'Coloque as metades dos ovos cozidos sobre o avocado e finalize com folhas de coentro ou salsinha.',
            'Sirva imediatamente.',
        ],
        new: true,
    },
];
