'use client';

import { apiURL } from '@/Constant';
import { createContext, useState, useContext } from 'react';

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
	const [activeTab, setActiveTab] = useState('profile');
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
			if (!response.success) {
				alert(response?.message);
			}
		} catch (error) {
			setMyRecipies(null);
			alert('Something went wrong!');
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
			if (!response.success) {
				alert(response?.message);
			}
		} catch (error) {
			setAllRecipies(null);
			alert('Something went wrong!');
		}
	};

	return (
		<RecipeContext.Provider
			value={{
				activeTab,
				setActiveTab,
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
