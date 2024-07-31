import Link from 'next/link';
import styles from './navbar.module.css';

const Navbar = () => {
	return (
		<div className={styles.container}>
			<Link href={'/'} className={styles.logo}>
				dishy
			</Link>

			<div className={styles.links}>
				<Link href={'/'} className={styles.link}>
					Home
				</Link>
				<Link href={'/recipe'} className={styles.link}>
					Recipe
				</Link>
				<Link href={'/blog'} className={styles.link}>
					Blog
				</Link>
				<Link href={'/about'} className={styles.link}>
					About
				</Link>
			</div>

			<div className={styles.buttons}>
				<Link href={'/login'} className={styles.button}>Log in</Link>
				<Link href={'/signup'}className={styles.button}>Sign up</Link>
			</div>
		</div>
	);
};

export default Navbar;
