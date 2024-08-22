import Link from 'next/link';
import styles from './footer.module.css';
import Image from 'next/image';

const Footer = () => {
	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<div className={styles.brand}>
					<h1>dishy</h1>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis
						libero atque amet nesciunt aliquid dolores corporis doloribus cumque
						sequi quod. Id aut sunt asperiores? Quis unde aspernatur iste hic
						dignissimos!
					</p>
				</div>

				<div className={styles.linkDiv}>
					<div className={styles.links}>
						<h3>Quick links</h3>
						<Link href={'/'}>Home</Link>
						<Link href={'/recipies'}>Recipies</Link>
						<Link href={'/blog'}>Blog</Link>
					</div>

					<div className={styles.links}>
						<h3>Quick links</h3>
						<Link href={'/'}>Share Recipe</Link>
						<Link href={'/recipies'}>Contact</Link>
						<Link href={'/blog'}>About Us</Link>
					</div>

					<div className={styles.links}>
						<h3>Legal</h3>
						<Link href={'/'}>Terms of use</Link>
						<Link href={'/recipies'}>Privacy & Cookies</Link>
					</div>
				</div>
			</div>

			<div className={styles.footer}>
				<p>&#169; 2024 dishy - The Flavor Network. All Rights Reserved</p>

				<div className={styles.icons}>
					<Link href={'/'}>
						<Image
							alt="facebook"
							src={'/facebook.png'}
							width={30}
							height={30}
						/>
					</Link>
					<Link href={'/'}>
						<Image
							alt="instagram"
							src={'/instagram.png'}
							width={30}
							height={30}
						/>
					</Link>
					<Link href={'/'}>
						<Image
							alt="pinterest"
							src={'/pinterest.png'}
							width={30}
							height={30}
						/>
					</Link>
					<Link href={'/'}>
						<Image alt="twitter" src={'/twitter.png'} width={30} height={30} />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Footer;
