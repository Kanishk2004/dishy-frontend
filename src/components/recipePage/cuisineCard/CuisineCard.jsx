import Image from 'next/image';
import styles from './cuisineCard.module.css';

const CuisineCard = ({ cuisine, category }) => {
	return (
		<div className={styles.ratingDetail}>
			<Image src={'/cuisine.png'} alt="star img" width={30} height={30} />
			<div>
				<p>Cuisine</p>
				<p>
					<b>{cuisine}</b>
				</p>
			</div>
			<div>
				<p>Category</p>
				<p>
					<b>{category}</b>
				</p>
			</div>
		</div>
	);
};

export default CuisineCard;
