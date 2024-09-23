'use client';

import { apiURL } from '@/Constant';
import { createContext, useState, useContext } from 'react';

const FavContext = createContext();

export const FavProvider = ({ children }) => {
	const [userFavorites, setUserFavorites] = useState(null);
	const [loadingFav, setLoadingFav] = useState(false);

	const getUserFavorites = async () => {
		try {
			const accessToken = localStorage.getItem('accessToken');
			setLoadingFav(true);
			let response = await fetch(`${apiURL}/favorites/`, {
				method: 'GET',
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
				credentials: 'include',
			});
			response = await response.json();
			if (response.success) {
				setUserFavorites(response.data.recipies);
			}
			setLoadingFav(false);
			if (!response.success) {
				setUserFavorites(null);
			}
		} catch (error) {
			console.log('Something went wrong!');
		}
	};

	const toggleFavorite = async (recipeId) => {
		setLoadingFav(true);
		try {
			const accessToken = localStorage.getItem('accessToken');
			let response = await fetch(`${apiURL}/favorites/toggle/${recipeId}`, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
				credentials: 'include',
			});
			response = await response.json();
			if (response.success) {
				setLoadingFav(false);
				getUserFavorites();
			}
		} catch (error) {
			console.log('Something went wrong!');
		}
	};

	return (
		<FavContext.Provider
			value={{
				toggleFavorite,
				getUserFavorites,
				userFavorites,
				loadingFav,
			}}>
			{children}
		</FavContext.Provider>
	);
};

export const useFav = () => useContext(FavContext);
