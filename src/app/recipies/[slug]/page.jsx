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
			cache: 'no-store',
			method: 'GET',
			headers: {
				'Content-type': 'application/json',
			},
			credentials: 'include',
		});
		response = await response.json();
		if (!response.success) {
			throw new Error('Something went wrong!');
		}
		return response.data;
	} catch (error) {
		console.log('Error: ', error);
	}
};

const recipe = async ({ params }) => {
	const { slug } = params;
	const recipe = await getRecipe(slug);

	return (
		<div className={styles.container}>
			<Suspense fallback={<Loading />}>
				<RecipePage recipe={recipe} />
			</Suspense>
		</div>
	);
};

export default recipe;
