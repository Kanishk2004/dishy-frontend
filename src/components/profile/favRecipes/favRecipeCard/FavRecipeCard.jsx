import Image from 'next/image';
import styles from './favRecipeCard.module.css';
import { useRouter } from 'next/navigation';

const FavRecipeCard = ({
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

	const handleViewRecipeClick = () => {
		router.push(`/recipies/${recipeId}`);
	};

	return (
		<div className={styles.recipeCard}>
			<div className={styles.imgContainer}>
				<Image
					className={styles.img}
					src={img}
					alt="Recipe image"
					width={200}
					height={130}
				/>
			</div>
			<div className={styles.infoContainer}>
				<div className={styles.cuisineAndCategory}>
					<span>
						<i>{cuisine}</i>
					</span>
					<span>
						<i>{category}</i>
					</span>
				</div>
				<p className={styles.title}>
					{title?.length > 20 ? title.toString().slice(0, 20) + '...' : title}
				</p>
				<div className={styles.ratingContainer}>
					<div>
						<div className={styles.iconContainer}>
							<Image src={'/clock.png'} alt="clock" width={15} height={15} />
							<p className={styles.avgRating}>{totalTime}</p>
						</div>

						<p>Minutes</p>
					</div>
					<div>
						<div className={styles.iconContainer}>
							<Image src={'/book.png'} alt="book" width={15} height={15} />
							<p className={styles.avgRating}>{ingredients}</p>
						</div>
						<p>Ingredients</p>
					</div>
				</div>
				<button className={styles.btn} onClick={handleViewRecipeClick}>
					View Recipe
				</button>
			</div>
		</div>
	);
};

export default FavRecipeCard;
