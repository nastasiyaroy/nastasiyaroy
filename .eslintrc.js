module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	parser: '@babel/eslint-parser',
	parserOptions: {
		ecmaVersion: 2021,
		sourceType: 'module',
	},
	plugins: ['@babel', 'prettier', 'unicorn', 'import'],
	extends: [
		'airbnb-base',
		'prettier',
		'plugin:import/recommended',
		'plugin:unicorn/recommended',
		'plugin:prettier/recommended',
	],
	rules: {
		// eslint
		'no-use-before-define': 0,
		'no-param-reassign': 0,
		// prettier
		'prettier/prettier': [
			'error',
			{
				printWidth: 120,
				singleQuote: true,
				trailingComma: 'all',
				tabWidth: 4,
				useTabs: true,
				semi: true,
			},
		],
		// unicorn
		'unicorn/no-array-for-each': 'off',
		'unicorn/no-null': 'off',
		'unicorn/prefer-module': 'off',
		'unicorn/prefer-node-protocol': 'off',
		'unicorn/filename-case': 'off',
		// import
		'import/extensions': [2, 'always'],
		'import/prefer-default-export': 0,
	},
};
