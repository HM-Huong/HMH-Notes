import { IoIosArrowBack } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

export default function EditNote() {
	return (
		<section>
			<header className='create-note__header'>
				<Link to='/' className='btn'>
					<IoIosArrowBack />
				</Link>
				<button className='btn lg danger'>
					<RiDeleteBin6Line />
				</button>
			</header>
			<form className='create-note__form'>
				<input type='text' autoFocus placeholder='Title ...' />
				<textarea rows='20' placeholder='Note details ...'></textarea>
			</form>
		</section>
	);
}
