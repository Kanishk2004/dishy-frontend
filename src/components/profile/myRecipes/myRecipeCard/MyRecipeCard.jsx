import Image from 'next/image';
import styles from './myRecipeCard.module.css';
import { useRouter } from 'next/navigation';

const MyRecipeCard = ({ recipe }) => {
	const router = useRouter();

	const handleViewRecipe = (recipeId) => {
		router.push(`/recipies/${recipeId}`);
	};

	const handleEditClick = (recipeId) => {
		router.push(`/edit/${recipeId}`);
	};
	return (
		<div className={styles.recipeCard}>
			<div className={styles.imgContainer}>
				<div
					className={styles.editIconContainer}
					onClick={() => handleEditClick(recipe?._id)}>
					<Image
						className={styles.editIcon}
						src={'/edit.png'}
						alt="Edit Icon"
						width={15}
						height={15}
					/>
				</div>
				<Image
					className={styles.img}
					src={recipe?.imageUrl[0]}
					alt="Recipe image"
					width={170}
					height={100}
				/>
			</div>
			<div className={styles.infoContainer}>
				<p className={styles.title}>
					{recipe?.title.toString().slice(0, 15) + '...'}
				</p>
				<div className={styles.ratingContainer}>
					<div>
						<p className={styles.avgRating}>
							{recipe?.averageRating.toString().slice(0, 3) + '/5'}
						</p>
						<p>Avg Rating</p>
					</div>
					<div>
						<p className={styles.avgRating}>{recipe?.numberOfRatings}</p>
						<p>Ratings</p>
					</div>
				</div>
				<p className={styles.date}>
					{recipe?.createdAt.toString().slice(0, 10)}
				</p>
				<button
					className={styles.btn}
					onClick={() => handleViewRecipe(recipe?._id)}>
					View Recipe
				</button>
			</div>
		</div>
	);
};

export default MyRecipeCard;
