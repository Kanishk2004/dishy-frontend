import { apiURL } from '@/Constant';
import styles from './recipe.module.css';
import RecipePage from '@/components/recipePage/RecipePage';
import { Suspense } from 'react';
import Loading from '@/components/loading/Loading';

export const generateMetadata = async ({ params }) => {
	const { slug } = params;
	const recipe = await getRecipe(slug);

	return {
		title: `Dishy - ${recipe.title ? recipe.title : 'Post title'}`,
		description: recipe.description,
	};
};

const getRecipe = async (slug) => {
	try {
		let response = await fetch(`${apiURL}/recipies/${slug}`, {
			method: 'GET',
			credentials: 'include',
		});
		response = await response.json();
		if (!response.success) {
			throw new Error('Something went wrong!');
		}
		// console.log(response.data);
		return response.data;
	} catch (error) {
		console.log('Error: ', error);
	}
};
const getRecipeAuthor = async (recipeId) => {
	try {
		let response = await fetch(`${apiURL}/recipies/author/${recipeId}`, {
			method: 'GET',
			credentials: 'include',
		});
		response = await response.json();
		if (response.success) {
			return response.data;
		}
	} catch (error) {
		console.log('Error: ', error);
	}
};
const getRecipeRating = async (recipeId) => {
	try {
		let response = await fetch(`${apiURL}/ratings/avg/${recipeId}`, {
			method: 'GET',
			credentials: 'include',
		});
		response = await response.json();

		if (response.success) {
			return response.data;
		}
	} catch (error) {
		console.log('Error: ', error);
	}
};

const recipe = async ({ params }) => {
	const { slug } = params;

	const recipe = await getRecipe(slug);
	const author = await getRecipeAuthor(slug);
	const rating = await getRecipeRating(slug);

	return (
		<div className={styles.container}>
			<Suspense fallback={<Loading />}>
				<RecipePage recipe={recipe} author={author} rating={rating} />
			</Suspense>
		</div>
	);
};

export default recipe;
