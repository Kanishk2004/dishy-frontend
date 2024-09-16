import Image from 'next/image';
import styles from './aboutDeveloper.module.css';

const AboutDeveloper = () => {
	return (
		<div className={styles.container}>
			<h2 className={styles.heading}>About Developer</h2>
			<div className={styles.detailsSection}>
				<div className={styles.infoContainer}>
					<div className={styles.imgContainer}>
						<Image
							className={styles.avatar}
							src={'/aboutpage/myavatar.png'}
							alt="avatar"
							width={200}
							height={200}
						/>
					</div>
					<div className={styles.text}>
						<p>
							<b>Hi, I&apos;m Kanishk Chandna,</b> the creator of Dishy - The
							Flavour Network. I&apos;m a passionate full-stack web developer
							with a deep love for coding and cooking, and I combined these two
							passions to build this platform.
						</p>
					</div>
					<div className={styles.text}>
						<h4>My Background</h4>
						<p>
							With <b> 2 years </b> of experience in web development, I&apos;ve
							worked on several projects that blend creativity and technology.
							Dishy is a project close to my heart, designed to bring food
							lovers together through an intuitive and user-friendly platform.
						</p>
					</div>
					<div className={styles.text}>
						<h4>My Vision for dishy</h4>
						<p>
							My goal with Dishy is to make it the go-to platform for food
							enthusiasts. I envision a space where cooks from all backgrounds
							can come together, inspire each other, and celebrate their love of
							food.
						</p>
					</div>
				</div>
				<div className={styles.contactDetailContainer}>
					<h3>Get In Touch</h3>
				</div>
			</div>
		</div>
	);
};

export default AboutDeveloper;
