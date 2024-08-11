'use client';

import { apiURL } from '@/Constant';
import { createContext, useState, useContext } from 'react';

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
	const [myRecipies, setMyRecipies] = useState(null);
	const [allRecipies, setAllRecipies] = useState(null);
	const [recipeAuthor, setRecipeAuthor] = useState(null);

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

	const getRecipeAuthor = async (recipeId) => {
		try {
			let response = await fetch(`${apiURL}/recipies/author/${recipeId}`, {
				method: 'GET',
				headers: {
					'Content-type': 'application/json',
				},
				credentials: 'include',
			});
			response = await response.json();
			if (response.success) {
				setRecipeAuthor(response.data);
			}
		} catch (error) {
			console.log('Error: ', error);
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
				getRecipeAuthor,
				recipeAuthor,
			}}>
			{children}
		</RecipeContext.Provider>
	);
};

export const useRecipe = () => useContext(RecipeContext);
