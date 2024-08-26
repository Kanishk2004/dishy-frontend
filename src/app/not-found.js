import Link from 'next/link';

const notFound = () => {
	return (
		<div className='notFoundContainer'>
			<h1>Not found</h1>
			<h3>Developer being too lazy to develop this page!</h3>
			<Link href={'/'}>
				<button>Return home</button>
			</Link>
		</div>
	);
};

export default notFound;
