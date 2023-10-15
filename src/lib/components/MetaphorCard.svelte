<script>
	import { browser } from '$app/environment';
	import DefinitionContent from '$lib/components/DefinitionContent.svelte';
	import { onMount } from 'svelte';

	/**
	 * @type {string}
	 */
	export let name;

	/**
	 * @type {string[]}
	 */
	export let list;

	/**
	 * @type {string}
	 */
	let item = list[0];

	function handleShuffle() {
		item = list[Math.floor(Math.random() * list.length)];
	}
</script>

<section class="card">
	<p class="metaphor">{@html item.name}</p>
	<div class="examples-container">
        <ul class="outer-list">
        {#each item.examples as example}
            {#if typeof example === "object"}
            <li class="outer-list-item">{@html example.subtype}</li>
                <ul class="inner-list">
                    {#each example.examples as nestedEx}
                        <li class="inner-list-item">{@html nestedEx}</li>
                    {/each}
                </ul>
            {:else if typeof example === "string"}
                <li class="list-item">{@html example}</li>
            {/if}
        {/each}
        </ul>
	</div>
    <footer class="footer">
        <!-- svelte-ignore a11y-autofocus -->
<button on:click={handleShuffle} autofocus>Shuffle</button>
</footer>
</section>

<style>
	.card {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		border-radius: 10px;
		border: none;
		padding: 20px;
		width: 50vw;
		height: auto;
        max-height: 50vh;
        min-height: 30vh;
		color: var(--color-text-0);
		background: var(--color-bg-1);
		box-shadow: 0 14px 30px rgba(0, 0, 0, 0.25), 0 10px 30px rgba(0, 0, 0, 0.22);
        overflow-y: scroll;
	}
	.card::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}

    .metaphor {
        margin: 0;
        padding: 0;
        font-size: 1.75rem;
    }

    .examples-container {
        padding: 0;
    }

    .outer-list {
        display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: flex-start;
        padding: 0px 10px;
    }

    .inner-list {
        display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: flex-start;
        list-style-type: circle;
    }

    .list-item {
        list-style-type: disc;
        padding: 5px;
        font-size: 1.25rem;
    }

    .outer-list-item {
        list-style-type: disc;
        padding: 5px;
        font-size: 1.25rem;
    }

    .inner-list-item {
        list-style-type: circle;
        padding: 5px;
        font-size: 1.15rem;
    }
</style>
