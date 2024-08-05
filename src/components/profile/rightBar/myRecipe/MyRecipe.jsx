'use client'
import { apiURL } from '@/Constant';
import styles from './myRecipe.module.css';
import RecipeCard from './recipeCard/RecipeCard';
import { useState } from 'react';

const MyRecipe = () => {
    const [myRecipies, setMyRecipies] = useState(null);

    const fetchMyRecipies = async(userId) => {
        try {
            let response = await fetch(`${apiURL}/recipies/u/${userId}`, {
                method: 'GET',
                credentials: 'include',
            })
            response = await response.json();

            if (response.success) {
                setMyRecipies(response.data)
            }
        } catch (error) {
            setMyRecipies(null)
        }
    }

	return (
		<div className={styles.container}>
			<RecipeCard />
		</div>
	);
};

export default MyRecipe;
