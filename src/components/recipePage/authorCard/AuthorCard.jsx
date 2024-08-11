'use client';
import Image from 'next/image';
import styles from './authorCard.module.css';
import { useRecipe } from '@/context/RecipeContext';
import { useEffect } from 'react';

const AuthorCard = ({ recipeId, createdAt }) => {
	const { recipeAuthor, getRecipeAuthor } = useRecipe();

	useEffect(() => {
		getRecipeAuthor(recipeId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.authorDetail}>
			<Image
				src={recipeAuthor?.avatar}
				alt="author img"
				width={40}
				height={40}
			/>
			<div>
				<p>Author</p>
				<p>
					<b>{recipeAuthor?.fullName || recipeAuthor?.username}</b>
				</p>
			</div>
			<div>
				<p>Published</p>
				<p>
					<b>{createdAt}</b>
				</p>
			</div>
		</div>
	);
};

export default AuthorCard;
