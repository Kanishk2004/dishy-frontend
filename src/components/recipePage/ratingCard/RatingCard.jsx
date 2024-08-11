'use client';
import Image from 'next/image';
import styles from './ratingCard.module.css';
import { useEffect } from 'react';
import { useRating } from '@/context/RatingContext';

const RatingCard = ({ recipeId }) => {
	const { getRecipeRating, recipeRating } = useRating();

	useEffect(() => {
		getRecipeRating(recipeId);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.ratingDetail}>
			<Image src={'/star.png'} alt="star img" width={30} height={30} />
			<div>
				<p>Rating</p>
				<p>
					<b>{Math.round(recipeRating?.avgRating * 10) / 10 || 0}</b>
				</p>
			</div>
			<div>
				<p>Reviews</p>
				<p>
					<b>{recipeRating?.ratingCount || 0}</b>
				</p>
			</div>
		</div>
	);
};

export default RatingCard;
