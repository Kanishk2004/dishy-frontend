'use client';

import { apiURL } from '@/Constant';
import { createContext, useState, useContext } from 'react';

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
	const [myRecipies, setMyRecipies] = useState(null);
	const [allRecipies, setAllRecipies] = useState(null);

	const fetchUserRecipies = async () => {
		try {
			let response = await fetch(`${apiURL}/recipies/myRecipies`, {
				method: 'GET',
				credentials: 'include',
			});
			response = await response.json();

			if (response.success) {
				setMyRecipies(response.data);
			}
		} catch (error) {
			setMyRecipies(null);
		}
	};

	const fetchAllRecipies = async () => {
		try {
			let response = await fetch(`${apiURL}/recipies/`, {
				method: 'GET',
				credentials: 'include',
			});
			response = await response.json();

			if (response.success) {
				setAllRecipies(response.data);
			}
		} catch (error) {
			setAllRecipies(null);
		}
	};

	return (
		<RecipeContext.Provider
			value={{
				fetchUserRecipies,
				myRecipies,
				setMyRecipies,
				fetchAllRecipies,
				allRecipies,
			}}>
			{children}
		</RecipeContext.Provider>
	);
};

export const useRecipe = () => useContext(RecipeContext);
