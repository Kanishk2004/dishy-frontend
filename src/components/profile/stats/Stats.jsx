import styles from './stats.module.css';

const Stats = ({
	recipeCount = 0,
	avgRating = 0,
	totalRating = 0,
	recipesRated = 0,
}) => {
	return (
		<div className={styles.container}>
			<div className={styles.stats}>
				<h4>{recipeCount}</h4>
				<p>Recipes Posted</p>
			</div>
			<div className={styles.stats}>
				<h4>{avgRating + '/5'}</h4>
				<p>Average Ratings</p>
			</div>
			<div className={styles.stats}>
				<h4>{totalRating}</h4>
				<p>Total Ratings</p>
			</div>
			<div className={styles.stats}>
				<h4>{recipesRated}</h4>
				<p>Recipes Rated</p>
			</div>
		</div>
	);
};

export default Stats;
