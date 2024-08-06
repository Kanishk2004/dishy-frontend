'use client';
import Image from 'next/image';
import styles from './recipeCard.module.css';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const RecipeCard = ({
	img,
	title,
	desc,
	cuisine,
	category,
	date,
	totalTime,
	ingredients,
	recipeId,
}) => {

	const router = useRouter();

	const handleViewRecipe = (recipeId)=>{
		router.push(`/recipies/${recipeId}`)
	}

	// const {getAvgRecipeRating, avgRating} = useAuth();
	// useEffect(() => {
	// 	getAvgRecipeRating(recipeId);
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	return (
		<div className={styles.container}>
			<div className={styles.imgContainer}>
				<div className={styles.favorite}>
					<Image
						className={styles.favIcon}
						src={'/white-favorite.png'}
						alt="favorite"
						width={20}
						height={20}
					/>
				</div>
				<Image
					className={styles.img}
					src={img}
					alt="recipe"
					width={300}
					height={200}
				/>
			</div>
			<div className={styles.recipeInfoContainer}>
				<div className={styles.cuisineAndCategory}>
					<span>
						<i>{cuisine}</i>
					</span>
					<span>
						<i>{category}</i>
					</span>
				</div>
				<div className={styles.recipeInfo}>
					{title?.length > 25 ? (
						<h2>{title?.toString().slice(0, 24) + '...'}</h2>
					) : (
						<h2>{title}</h2>
					)}

					<div className={styles.recipeDetails}>
						<div>
							<div className={styles.clockContainer}>
								<Image src={'/clock.png'} alt="clock" width={20} height={20} />
								<p className={styles.totalTime}>
									<b>{totalTime}</b>
								</p>
							</div>
							<p className={styles.detailName}>Minutes</p>
						</div>
						<div>
							<div className={styles.clockContainer}>
								<Image src={'/book.png'} alt="book" width={20} height={20} />
								<p className={styles.totalTime}>
									<b>{ingredients}</b>
								</p>
							</div>
							<p className={styles.detailName}>Ingredients</p>
						</div>
						{/* <div>
							<div className={styles.clockContainer}>
								<Image src={'/star.png'} alt="book" width={20} height={20} />
								<p className={styles.totalTime}>
									<b>{avgRating}</b>
								</p>
							</div>
							<p className={styles.detailName}>Rating</p>
						</div> */}
					</div>

					<p className={styles.desc}>{desc.toString().slice(0, 100) + '...'}</p>
					<button className={styles.btn} onClick={()=> handleViewRecipe(recipeId)}>View Recipe</button>
					{/* <p className={styles.date}>{date.toString().slice(0, 10)}</p> */}
				</div>
			</div>
		</div>
	);
};

export default RecipeCard;
