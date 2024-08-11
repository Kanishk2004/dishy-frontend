'use client';
import { useAuth } from '@/context/AuthContext';
import styles from './addRating.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRating } from '@/context/RatingContext';

const AddRating = ({ recipeId, totalStars = 5 }) => {
	const { user, setMessage } = useAuth();
	const { addRating, userRatings, getUserRatings } = useRating();

	const [rating, setRating] = useState(0);
	const [rate, setRate] = useState(0);
	const [isAlreadyRated, setIsAlreadyRated] = useState(false);

	useEffect(() => {
		const checkIfAlreadyRated = async () => {
			const myRatings = await getUserRatings();

			for (let i = 0; i < myRatings.length; i++) {
				if (myRatings[i].recipe === recipeId) {
					setIsAlreadyRated(true);
				}
				// const element = userRatings[i];
			}
		};
		checkIfAlreadyRated();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleClick = (index) => {
		setRating(index + 1);
		setRate(index + 1);
	};

	const handleSubmit = async () => {
		const rating = await addRating(recipeId, rate);
		if (rating.success) {
			setMessage({
				success: rating.success,
				message: rating.message,
			});
		}
		if (!rating.success) {
			setMessage({
				success: rating.success,
				message: rating.message,
			});
		}
	};

	return (
		<div className={styles.container}>
			{user && (
				<div className={styles.innerContainer}>
					<h3>Rate This Recipe</h3>
					{isAlreadyRated ||
						[...Array(totalStars)].map((_, index) => (
							<Image
								key={index}
								src={
									index < rating ? '/gold-star.png' : '/gold-outline-star.png'
								}
								alt="star"
								width={30}
								height={30}
								onClick={() => handleClick(index)}
							/>
						))}
					{rate > 0 && (
						<button className={styles.btn} onClick={handleSubmit}>
							Submit
						</button>
					)}
					{isAlreadyRated && <h3>You have already rated this recipe.</h3>}
				</div>
			)}
		</div>
	);
};

export default AddRating;
