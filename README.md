# npm-create-tsx

npm module to simplify react component files creation using templates

## building module

1. `yarn install`
2. `yarn build`

## testing module

1. `cd test`
2. `npm link ../`
3. `npx create-tsx src/components/MyComponent --dry-run`

## publishing to npm

1. `npm login`
2. `npm publish --access public`

## removing from npm

1. `npm unpublish --force`
2. `npm unpublish --force --registry https://registry.npmjs.org/`
