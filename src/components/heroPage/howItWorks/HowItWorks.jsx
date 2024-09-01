import Image from 'next/image';
import styles from './howItWorks.module.css';

const HowItWorks = () => {
	return (
		<div className={styles.container}>
			<h2 className={styles.heading}>How It Works</h2>
			<div className={styles.cardContainer}>
				<div className={styles.card}>
					<div className={styles.iconContainer}>
						<Image
							className={styles.icon}
							src={'/heropage/register-user.png'}
							alt="Register user icon"
							width={40}
							height={40}
						/>
					</div>
					<div>
						<h2 className={styles.cardTitle}>Sign Up for Free</h2>
						<p className={styles.cardDesc}>
							Create your account in seconds. Sign up with your email to start
							exploring and sharing recipes
						</p>
					</div>
				</div>

				<div className={styles.card}>
					<div className={styles.iconContainer}>
						<Image
							className={styles.icon}
							src={'/heropage/magnifier.png'}
							alt="Magnifier icon"
							width={40}
							height={40}
						/>
					</div>
					<div>
						<h2 className={styles.cardTitle}>Explore & Share Recipes</h2>
						<p className={styles.cardDesc}>
							Browse thousands of recipes from around the world. Find your next
							favorite dish or share your own culinary creations with the
							community
						</p>
					</div>
				</div>

				<div className={styles.card}>
					<div className={styles.iconContainer}>
						<Image
							className={styles.icon}
							src={'/heropage/heart.png'}
							alt="Heart icon"
							width={40}
							height={40}
						/>
					</div>
					<div>
						<h2 className={styles.cardTitle}>Engage & Connect</h2>
						<p className={styles.cardDesc}>
							Rate and comment on recipes, follow other food lovers, and build
							your network. Connect with a community that shares your passion
							for cooking
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HowItWorks;
