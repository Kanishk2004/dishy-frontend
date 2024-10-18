import Link from 'next/link';
import styles from './footer.module.css';
import Image from 'next/image';

const Footer = () => {
	return (
		<div className={styles.container}>
			<div className={styles.popUp}>
				<div>
					<p>
						The backend server for this application is currently inactive. It
						was live for over two months, during which time it provided a fully
						functional experience. However, as this project is a hobby endeavor,
						maintaining the server became cost-prohibitive. While the live
						application is currently offline, the complete source code is
						available on my{' '}
						<a href="https://github.com/Kanishk2004">
							<b> Github Profile</b>
						</a>{' '}
						for those interested in exploring the project or contributing to its
						development. Feel free to review the code and reach out with any
						questions or feedback.
					</p>
				</div>
			</div>
			<div className={styles.main}>
				<div className={styles.brand}>
					<h1>dishy</h1>
					<p>
						Discover a world of culinary delights with Dishy - The Flavour
						Network! Share your favorite recipes, explore new and exciting
						dishes, and connect with a community of food enthusiasts. Dishy
						offers a platform to showcase your culinary creations, get inspired
						by others, and rate and comment on recipes.
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
						<Link href={'/share'}>Share Recipe</Link>
						<Link
							href={'https://www.linkedin.com/in/kanishk-chandna-9553931b0/'}>
							Contact
						</Link>
						<Link href={'/about'}>About Us</Link>
					</div>

					<div className={styles.links}>
						<h3>Legal</h3>
						<Link href={'/'}>Terms of use</Link>
						<Link href={'/'}>Privacy & Cookies</Link>
					</div>
				</div>
			</div>

			<div className={styles.footer}>
				<p>&#169; 2024 dishy - The Flavor Network. All Rights Reserved</p>

				<div className={styles.icons}>
					<Link href={'https://www.linkedin.com/in/kanishk-chandna-9553931b0/'}>
						<Image
							alt="linkedin logo"
							src={'/linkedin.png'}
							width={30}
							height={30}
						/>
					</Link>
					<Link href={'https://www.instagram.com/kanishk__fr'}>
						<Image
							alt="instagram"
							src={'/instagram.png'}
							width={30}
							height={30}
						/>
					</Link>
					<Link href={'https://in.pinterest.com/'}>
						<Image
							alt="pinterest"
							src={'/pinterest.png'}
							width={30}
							height={30}
						/>
					</Link>
					<Link href={'https://x.com/Kanishk_fr'}>
						<Image alt="twitter" src={'/twitter.png'} width={30} height={30} />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Footer;
