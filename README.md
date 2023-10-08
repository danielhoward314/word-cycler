# configuring env vars

Create a `.env` file and add the following (replace with actual Merriam-Webster API keys)

```
ENVIRONMENT=local
PUBLIC_DICTIONARY_API_KEY=replace_me
PUBLIC_THESAURUS_API_KEY=replace_me
```

Local case relies on sveltekit [$env/static/public](https://kit.svelte.dev/docs/modules#$env-static-public) module.

For non-local case, add the 2 API key env vars to Environment Variables in Netlify UI for this project without the `PUBLIC_` prefix. 

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
