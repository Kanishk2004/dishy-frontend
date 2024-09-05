'use client';
import styles from './ratings.module.css';
import { apiURL } from '@/Constant';
import { useEffect, useState } from 'react';

const Ratings = ({ userProfile }) => {
	const [userRatings, setUserRatings] = useState([]);

	const getUserRatings = async () => {
		try {
			let res = await fetch(`${apiURL}/ratings/user/${userProfile?._id}`, {
				method: 'GET',
				headers: {
					'Content-type': 'application/json',
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

	useEffect(() => {
		if (userProfile._id) {
			getUserRatings();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userProfile._id]);
	return (
		<div className={styles.container}>
			<h5>My Ratings</h5>
			{userRatings.map((ratings) => (
				<div key={ratings._id}>
					<h1>{ratings.rating}</h1>
				</div>
			))}
		</div>
	);
};

export default Ratings;
