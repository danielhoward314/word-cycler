<script>
	import { page } from '$app/stores';
</script>

<header>
	<nav>
		<ul>
			<li aria-current={$page.url.pathname.startsWith('/tier-one-verbs') ? 'page' : undefined}>
				<a href="/tier-one-verbs">Tier One Verbs</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/tier-two-verbs') ? 'page' : undefined}>
				<a href="/tier-two-verbs">Tier Two Verbs</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/latinate-verbs') ? 'page' : undefined}>
				<a href="/latinate-verbs">Latinate Verbs</a>
			</li>
			<li
				aria-current={$page.url.pathname.startsWith('/binary-adjective-pairs') ? 'page' : undefined}
			>
				<a href="/binary-adjective-pairs">Binary Adjective Pairs</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/abstract-nouns') ? 'page' : undefined}>
				<a href="/abstract-nouns">Abstract Nouns</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/epithets') ? 'page' : undefined}>
				<a href="/epithets">Epithets</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/greek-latin-roots') ? 'page' : undefined}>
				<a href="/greek-latin-roots">Greek / Latin Roots</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/idioms') ? 'page' : undefined}>
				<a href="/idioms">Idioms</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/color-list') ? 'page' : undefined}>
				<a href="/color-list">Colors</a>
			</li>
		</ul>
	</nav>
</header>

<style>
	header {
		display: flex;
	}

	nav {
		display: flex;
		width: 100%;
		/* background: #ffebb7; */
		background: #9ddcdc;
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
		padding-right: 1em;
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text-1);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-text-hover-1);
		border-bottom: 0.35em solid #dece9c;
	}
</style>
