import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
	return (
		<div className={styles.container}>
			<div className={styles.textContainer}>
				<h1>dishy - The Flavor Network</h1>
				<h3>Home page</h3>
			</div>
			<div className={styles.imageContainer}>
				<Image src={'/recipe-illustration.png'} alt='hero image' width={500} height={500}/>
			</div>
		</div>
	);
}