const path = require('path');


const extensions = ['.js', '.json', '.css', '.scss'];

const customHooksWithDeps = [
    'useUpdateOnlyEffect',
    'useSelector',
    'useAction',
];

module.exports = {
    extends: ['airbnb'],
    settings: {
        'import/extensions': extensions,
        'import/resolver': {
            node: {
                extensions,
            },
        },
        'import/core-modules': [
            'redux-saga/effects',
        ],
    },

    plugins: [
        'react-hooks',
    ],
    globals: {
        window: true,
        document: true,
        __dirname: true,
        process: true,
        jest: true,
        describe: true,
        test: true,
        it: true,
        expect: true,
        beforeEach: true,
        File: true,
    },
    rules: {
        'max-len': ['warn', {
            code: 100,
            tabWidth: 4,
            ignoreUrls: true,
            ignoreComments: true,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
        }],
        'linebreak-style': 'off',
        'no-use-before-define': 'off',
        'no-plusplus': 'off',
        'no-debugger': 'warn',

        'indent': 'off',
        'no-unused-vars': 'off',

        'no-continue': 'off',
        'no-empty': ['error', {
            allowEmptyCatch: true,
        }],
        'no-extra-parens': ['warn', 'all', {
            ignoreJSX: 'all',
        }],
        'operator-linebreak': ['error', 'after', {
            overrides: {
                '?': 'before',
                ':': 'before',
            },
        }],
        'no-restricted-syntax': 'off',
        'no-mixed-operators': 'off',
        'no-console': 'off',
        'no-shadow': 'off',
        'no-nested-ternary': 'off',
        'no-confusing-arrow': 'off',

        'no-underscore-dangle': 'off',
        'implicit-arrow-linebreak': 'off',
        'prefer-destructuring': ['error', {
            VariableDeclarator: {
                array: false,
                object: true,
            },
            AssignmentExpression: {
                array: false,
                object: false,
            },
        }],

        'global-require': 'off',
        'import/no-dynamic-require': 'off',
        'import/prefer-default-export': 'off',
        'import/newline-after-import': ['error', {
            count: 2,
        }],
        'import/no-extraneous-dependencies': ['error', {
            devDependencies: true,
        }],
        'import/order': ['warn', {
            'groups': [
                ['builtin', 'external'],
                'internal',
                ['parent', 'sibling', 'index'],
            ],
            'newlines-between': 'always',
        }],
        'import/first': 'off',
        'import/no-unresolved': ['warn', {
            commonjs: true,
            caseSensitive: true,
        }],
        'import/no-default-export': 'error',

        'arrow-parens': ['error', 'as-needed', {
            requireForBlockBody: false,
        }],
        'no-param-reassign': ['error', {
            props: false,
        }],

        'object-curly-newline': ['error', {
            multiline: true,
            consistent: true,
        }],
        'nonblock-statement-body-position': ['error', 'below'],
        'no-multiple-empty-lines': ['error', { max: 2 }],
        'curly': ['error', 'multi-or-nest'],
        'quote-props': [2, 'consistent-as-needed'],

        'react/jsx-filename-extension': ['error', {
            extensions: ['.js', '.jsx', '.tsx'],
        }],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-props-no-spreading': 'off',
        'react/destructuring-assignment': 'off',
        'react/prop-types': 'off',
        'react/forbid-prop-types': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': ['warn', {
            additionalHooks: `^(${customHooksWithDeps.join('|')})$`,
        }],
        'react/no-multi-comp': 'off',
        'jsx-quotes': ['error', 'prefer-single'],
        'react/no-array-index-key': 'off',
        'react/button-has-type': 'off',
        'react/sort-comp': ['error', {
            order: [
                'instance-variables',
                'static-methods',
                'lifecycle',
                'everything-else',
                'rendering',
            ],
            groups: {
                rendering: [
                  '/^render.+$/',
                  'render',
                ],
            },
        }],

        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/label-has-for': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
    },
    overrides: [
        {
            files: ['*.stories.js'],
            rules: {
                'import/no-default-export': 'off',
            },
        },
    ],
};
