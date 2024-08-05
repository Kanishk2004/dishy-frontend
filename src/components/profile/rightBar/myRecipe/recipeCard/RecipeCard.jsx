import Image from 'next/image';
import styles from './recipeCard.module.css';

const RecipeCard = ({ img, title, desc, cuisine, category, date }) => {
	return (
		<div className={styles.container}>
			<div className={styles.imgContainer}>
				<Image
					className={styles.img}
					src={img}
					alt="recipe"
					width={300}
					height={200}
				/>
			</div>
			<div className={styles.recipeInfo}>
				{title?.length > 25 ? (
					<h2>{title?.toString().slice(0, 24) + '...'}</h2>
				) : (
					<h2>{title}</h2>
				)}
				<p>{desc.toString().slice(0, 200) + '...'}</p>
				<div className={styles.cuisineAndCategory}>
					<span>
						<i>{cuisine}</i>
					</span>
					<span>
						<i>{category}</i>
					</span>
				</div>
				<p>{date.toString().slice(0, 10)}</p>
			</div>
		</div>
	);
};

export default RecipeCard;
