<script>
	export let data;
	export let type;
	export let word;

	console.log(data);

	function convertFormattingTokens(et) {
		const tokenReplacements = [
			{ mw: '{b}', html: '<strong>' },
			{ mw: '{/b}', html: '</strong>' },
			{ mw: '{bc}', html: '<strong>;</strong> ' },
			{ mw: '{inf}', html: '<sub>' },
			{ mw: '{/inf}', html: '</sub>' },
			{ mw: '{it}', html: '<em>' },
			{ mw: '{/it}', html: '</em>' },
			{ mw: '{ldquo', html: 'U+201C' },
			{ mw: '{rdquo', html: 'U+201D' },
			{ mw: '{sc}', html: '' },
			{ mw: '{/sc}', html: '' },
			{ mw: '{sup}', html: '<sup>' },
			{ mw: '{/sup}', html: '</sup>' }
		];

		tokenReplacements.forEach((rep) => {
			if (et.includes(rep.mw)) {
				et = et.replaceAll(rep.mw, rep.html);
			}
		});
		return et;
	}
</script>

<p class="word">
	{@html word}
</p>
<hr />
{#if (data || []).length > 0 && type === 'DEFINITION'}
	{#each data as defsOuter}
		<p class="part-of-speech">{@html defsOuter.partOfSpeech}</p>
		{#if defsOuter.preposition}
			<span><em>{@html defsOuter.preposition}</em></span>
		{/if}
		<ol class="definition-list">
			{#each defsOuter.definitions as defs}
				<li class="definition">{@html defs}</li>
			{/each}
		</ol>
		{#if defsOuter.etymology}
			<p>{@html convertFormattingTokens(defsOuter.etymology)}</p>
		{/if}
	{/each}
{:else if (data || []).length > 0 && type === 'SYNONYMS'}
{#each data as synonymsOuter}
<p class="part-of-speech">{@html synonymsOuter.partOfSpeech}</p>
<span>{@html synonymsOuter.definition}</span>
{#if (synonymsOuter.synonyms || []).length > 0}
<h2>Synonyms</h2>
<ol class="synonyms-list">
	{#each synonymsOuter.synonyms as syns}
		<li class="synonym">{@html syns}</li>
	{/each}
</ol>
{/if}
{#if (synonymsOuter.antonyms || []).length > 0}
<h2>Antonyms</h2>
<ol class="antonyms-list">
	{#each synonymsOuter.antonyms as ants}
		<li class="antonym">{@html ants}</li>
	{/each}
</ol>
<hr />
{/if}
{/each}
{/if}

<a class="mw-link" target="_blank" href={`https://www.merriam-webster.com/dictionary/${word}`}
	>merriam-webster.com</a
>
<hr class="bottom" />

<style>
	.word {
		font-size: 2.5rem;
		font-weight: 500;
		padding: 0;
		margin: 0;
	}

	.part-of-speech {
		font-size: 1.5rem;
		padding: 0;
		margin: 0;
	}

	a {
		font-size: 16px;
		text-decoration: none;
		color: #4c5866;
	}

	a:hover {
		color: #727472;
		border-bottom: 0.1rem solid #727472;
	}

	.bottom {
		margin: 20px 0;
	}
</style>
