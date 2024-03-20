<script lang="ts">
	import type { Country } from '../types';
	import type { PageData } from './$types';
	import { browser } from '$app/environment';

	export let data: PageData;
	const countries = data.countries;

	const MAX_COUNTRIES_PER_PAGE = 10;

	let currentPage = 1;

	let indexofFirstCountry: number;
	let indexofLastCountry: number;
	let currentCountries: Country[];

	$: {
		indexofFirstCountry = (currentPage - 1) * MAX_COUNTRIES_PER_PAGE;
		indexofLastCountry = currentPage * MAX_COUNTRIES_PER_PAGE;
		currentCountries = countries.slice(indexofFirstCountry, indexofLastCountry);
	}

	const pageNumbers = Array.from(
		{ length: Math.ceil(countries.length / MAX_COUNTRIES_PER_PAGE) },
		(_, i) => i + 1
	);

	type OnPaginateParams = {
		step?: number;
		page?: number;
	};

	const onPaginate = ({ step, page }: OnPaginateParams) => {
		if (step) {
			currentPage += step;
		}

		if (page) {
			currentPage = page;
		}
	};

	let windowWidth: number;

	if (browser) {
		windowWidth = window.innerWidth;
	}
</script>

<svelte:head>
	<title>Prog Assignment 1. Web API Data</title>
	<meta name="description" content="CMSC 186 - Prog Assignment 1: Web API Data" />
</svelte:head>

<main class="mainContent" class:mobileView={windowWidth < 600}>
	<header class="mainContent__header">
		<img
			src="https://static.vecteezy.com/system/resources/previews/010/870/384/original/world-globe-icon-png.png"
			alt="Globe"
			width="200"
		/>

		<div class="mainContent__header__text">
			<h1>Countries List</h1>
			<p>
				These countries are fetched from the <a href="https://restcountries.com" target="_blank"
					>restcountries.com</a
				>
			</p>
		</div>
	</header>

	<table>
		<thead>
			<tr>
				<th>Name</th>
				<th>Region</th>
				<th>Area in km^2</th>
				<th>Capital</th>
				<th>Demonym</th>
			</tr>
		</thead>

		<tbody>
			{#each currentCountries as country}
				<tr>
					<td>{country.name}</td>
					<td>{country.region}</td>
					<td>{country.area}</td>
					<td>{country.capital}</td>
					<td>{country.demonym}</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<nav>
		<button disabled={currentPage === 1} on:click={() => onPaginate({ step: -1 })}>
			{'<'}
		</button>

		<div class="pageNumbers">
			{#each pageNumbers as page}
				<button disabled={currentPage === page} on:click={() => onPaginate({ page })}>
					{page}
				</button>
			{/each}
		</div>

		<button
			disabled={indexofLastCountry >= countries.length}
			on:click={() => onPaginate({ step: 1 })}
		>
			{'>'}
		</button>
	</nav>

	<footer>
		<p>
			Developed by: <a href="https://github.com/seangaaab" target="_blank">Sean Gabriel Bayron</a>
		</p>
		<p>
			Source code: <a href="https://github.com/seangaaab/CMSC-186-PA1" target="_blank">GitHub</a>
		</p>
	</footer>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

	:root {
		font-family: 'Poppins', sans-serif;

		color: #333333;
		background-color: #e3ffe3;

		font-synthesis: none;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-text-size-adjust: 100%;
	}

	.mainContent {
		width: 100%;
		max-width: 1080px;
		margin: 0 auto;
		padding: 2rem;
		padding-top: 3rem;

		display: flex;
		flex-direction: column;
	}

	.mobileView {
		padding: 0;
	}

	.mainContent__header {
		display: flex;
		flex-direction: row;
		align-items: center;

		&mainContent__header__text {
			display: flex;
			flex-direction: row;
			align-items: center;
		}
	}

	table {
		width: 100%;
		min-width: 500px;
		overflow-x: auto;
	}

	nav {
		margin-top: 2rem;
		display: flex;
		justify-content: space-around;
	}

	button {
		font-size: 1rem;
		background-color: transparent;
		border: none;
		padding: 0.5rem;

		&:hover:not([disabled]) {
			cursor: pointer;
			font-weight: bold;
			transition: all 0.3s ease-in-out;
		}

		&[disabled] {
			cursor: not-allowed;
		}
	}

	.pageNumbers {
		display: flex;
		flex-wrap: wrap;
		flex-grow: 0;
	}
</style>
