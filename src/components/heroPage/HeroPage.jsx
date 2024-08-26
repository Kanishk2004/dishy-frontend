import Image from 'next/image';
import styles from './heroPage.module.css';
import Link from 'next/link';

const HeroPage = () => {
	return (
		<div className={styles.container}>
			<div className={styles.textContainer}>
				<h1>dishy - The Flavor Network</h1>
				<h3>Home page - Under Maintenance...</h3>
				<button>
					<Link href={'/recipies'}>Explore Recipies</Link>
				</button>
			</div>
			<div className={styles.imageContainer}>
				{/* <Image
					src={'/recipe-illustration.png'}
					alt="hero image"
					width={500}
					height={500}
				/> */}
			</div>
		</div>
	);
};

export default HeroPage;
