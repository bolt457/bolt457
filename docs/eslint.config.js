import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginTypeScript from '@typescript-eslint/eslint-plugin';
import globals from 'globals';

export default [
    {
        ignores: ['node_modules/**'],
    },
    {
        files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
                es2021: true,
            },
        },
        plugins: {
            react: eslintPluginReact,
            '@typescript-eslint': eslintPluginTypeScript,
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            // Ajoutez vos règles personnalisées ici
        },
    },
];

