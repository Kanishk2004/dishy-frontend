import Image from 'next/image';
import styles from './editRecipeCard.module.css';
import { useRouter } from 'next/navigation';

const EditRecipeCard = ({
	img,
	title,
	desc,
	cuisine,
	category,
	totalTime,
	ingredients,
	recipeId,
}) => {
	const router = useRouter();

	const handleViewRecipe = (recipeId) => {
		router.push(`/recipies/${recipeId}`);
	};

	const handleEditClick = (recipeId) => {
		router.push(`/edit/${recipeId}`);
	};

	return (
		<div className={styles.container}>
			<div
				className={styles.favorite}
				onClick={() => handleEditClick(recipeId)}>
				<Image
					className={styles.favIcon}
					src={'/white-edit.png'}
					alt="edit"
					width={20}
					height={20}
				/>
			</div>
			<div className={styles.imgContainer}>
				<Image
					className={styles.img}
					src={img}
					alt="recipe"
					width={300}
					height={200}
					priority={false}
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
					</div>

					<p className={styles.desc}>{desc.toString().slice(0, 50) + '...'}</p>
					<button
						className={styles.btn}
						onClick={() => handleViewRecipe(recipeId)}>
						View Recipe
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditRecipeCard;
