'use client';
import { useAuth } from '@/context/AuthContext';
import styles from './addRating.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRating } from '@/context/RatingContext';

const AddRating = ({ recipeId, totalStars = 5 }) => {
	const { user } = useAuth();
	const { addRating, getUserRatings, deleteRating } = useRating();

	const [rating, setRating] = useState(0);
	const [rate, setRate] = useState(0);
	const [isAlreadyRated, setIsAlreadyRated] = useState(false);
	const [oldRating, setOldRating] = useState(0);
	const [oldRatingId, setOldRatingId] = useState('');

	const checkIfAlreadyRated = async () => {
		const myRatings = await getUserRatings();

		for (let i = 0; i < myRatings.length; i++) {
			if (myRatings[i].recipe === recipeId) {
				setIsAlreadyRated(true);
				setOldRating(myRatings[i]?.rating);
				setOldRatingId(myRatings[i]._id);
			}
		}
	};

	useEffect(() => {
		if (user) {
			checkIfAlreadyRated();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleStarClick = (index) => {
		setRating(index + 1);
		setRate(index + 1);
	};

	const handleSubmit = async () => {
		const addedRating = await addRating(recipeId, rate);
		console.log(addedRating);
		if (addedRating.success) {
			checkIfAlreadyRated();
			setRate(0);
		}
	};

	const updateRating = async () => {
		await checkIfAlreadyRated();
		await deleteRating(oldRatingId);
		setIsAlreadyRated(false);
		setRating(0);
	};

	return (
		<div className={styles.container}>
			{user && (
				<div className={styles.innerContainer}>
					<h3>Rate This Recipe</h3>
					<div className={styles.starContainer}>
						{isAlreadyRated ||
							[...Array(totalStars)].map((_, index) => (
								<Image
									key={index}
									className={styles.starImg}
									src={
										index < rating ? '/gold-star.png' : '/gold-outline-star.png'
									}
									alt="star"
									width={30}
									height={30}
									onClick={() => handleStarClick(index)}
								/>
							))}
					</div>
					{rate > 0 && (
						<button className={styles.btn} onClick={handleSubmit}>
							Submit
						</button>
					)}

					{isAlreadyRated && (
						<div className={styles.alreadyRated}>
							<h3>You have rated this recipe {oldRating} Stars.</h3>
							<button className={styles.deleteBtn} onClick={updateRating}>
								Delete Rating
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default AddRating;
