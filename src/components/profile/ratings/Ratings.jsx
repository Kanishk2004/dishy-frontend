'use client';
import styles from './ratings.module.css';
import { apiURL } from '@/Constant';
import { useRating } from '@/context/RatingContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Ratings = ({ userProfile }) => {
	const { deleteRating } = useRating();
	const [userRatings, setUserRatings] = useState([]);

	const getUserRatings = async () => {
		try {
			const accessToken = localStorage.getItem('accessToken');
			let res = await fetch(`${apiURL}/ratings/user/${userProfile?._id}`, {
				method: 'GET',
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
				credentials: 'include',
			});
			res = await res.json();
			if (res.success) {
				setUserRatings(res.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const calculateDaysDifference = (createdAt) => {
		const createdDate = new Date(createdAt);
		const currentDate = new Date();
		// Difference in time (in milliseconds)
		const diffTime = Math.abs(currentDate - createdDate);
		// Convert the difference to days
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	};

	useEffect(() => {
		if (userProfile._id) {
			getUserRatings();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userProfile._id]);

	const handleRatingDelete = async (ratingId) => {
		await deleteRating(ratingId);
		await getUserRatings();
	};

	return (
		<div className={styles.container}>
			<h5>My Ratings - ({userRatings.length})</h5>
			{userRatings.length > 0 ? (
				<table className={styles.ratingTable}>
					<thead>
						<tr>
							<th>Recipe Title</th>
							<th>Rating</th>
							<th>Date</th>
							<th>Author</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{userRatings.map((ratings) => (
							<tr key={ratings._id}>
								<td className={styles.recipeTitle}>
									<Link href={`/recipies/${ratings.recipeDetails._id}`}>
										{ratings.recipeDetails?.title || 'N/A'}
									</Link>
								</td>
								<td>{ratings.rating}</td>
								<td>{calculateDaysDifference(ratings.createdAt)} days ago</td>
								<td>
									{ratings.recipeDetails.recipeAuthor.fullName
										.toString()
										.slice(0, 20)}
								</td>
								<td>
									<button onClick={() => handleRatingDelete(ratings._id)}>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p className={styles.noRatings}>No ratings available.</p>
			)}
		</div>
	);
};

export default Ratings;
