'use client';

import { apiURL } from '@/Constant';
import { createContext, useState, useContext } from 'react';

const RatingContext = createContext();

export const RatingProvider = ({ children }) => {
	const [userRatings, setUserRatings] = useState(null);
	const [recipeRating, setRecipeRating] = useState(null);

	const getRecipeRating = async (recipeId) => {
		try {
			const accessToken = localStorage.getItem('accessToken');
			let response = await fetch(`${apiURL}/ratings/avg/${recipeId}`, {
				method: 'GET',
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
				credentials: 'include',
			});
			response = await response.json();

			if (response.success) {
				setRecipeRating(response?.data);
			}
		} catch (error) {
			console.log('Error: ', error);
		}
	};

	const getUserRatings = async () => {
		try {
			const accessToken = localStorage.getItem('accessToken');
			let res = await fetch(`${apiURL}/users/myratings`, {
				method: 'GET',
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
				credentials: 'include',
			});

			res = await res.json();
			setUserRatings(res.data);
			return res.data;
		} catch (error) {
			console.log(error);
		}
	};

	const addRating = async (recipeId, rate) => {
		try {
			const accessToken = localStorage.getItem('accessToken');
			let res = await fetch(`${apiURL}/ratings/${recipeId}`, {
				method: 'POST',
				body: JSON.stringify({
					rate,
				}),
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
				credentials: 'include',
			});

			res = await res.json();

			if (res.success) {
				console.log(res.data);
				return {
					success: true,
					message: 'Rating added successfully',
				};
			}
			if (!res.success) {
				return { success: false, message: 'Something went wrong!' };
			}
		} catch (error) {
			console.log(error);
			return { success: false, message: 'Something went wrong!' };
		}
	};

	const deleteRating = async (ratingId) => {
		try {
			const accessToken = localStorage.getItem('accessToken');
			let res = await fetch(`${apiURL}/ratings/${ratingId}`, {
				method: 'DELETE',
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
				credentials: 'include',
			});

			res = await res.json();

			if (res.success) {
				return { success: true, message: 'Rating Deleted!' };
			}
			if (!res.success) {
				return { success: false, message: 'Something went wrong!' };
			}
		} catch (error) {
			console.log(error);
			return { success: false, message: 'Something went wrong!' };
		}
	};

	return (
		<RatingContext.Provider
			value={{
				addRating,
				userRatings,
				getUserRatings,
				getRecipeRating,
				recipeRating,
				deleteRating,
			}}>
			{children}
		</RatingContext.Provider>
	);
};

export const useRating = () => useContext(RatingContext);
