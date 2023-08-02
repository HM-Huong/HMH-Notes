import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';

import useCreateDate from '../hooks/useCreateDate';

export default function CreateNote({ setNotes }) {
	const [title, setTitle] = useState('');
	const [details, setDetails] = useState('');
	const navigate = useNavigate();
	const date = useCreateDate();

	function handleSubmit(e) {
		e.preventDefault();

		// an empty string is a falsy value
		if (title && details) {
			const note = {
				id: uuid(),
				title,
				details,
				date,
			};
			setNotes((prevNotes) => [note, ...prevNotes]);
			navigate('/');
		}
	}

	return (
		<section>
			<header className='create-note__header'>
				<Link to='/' className='btn'>
					<IoIosArrowBack />
				</Link>
				<button className='btn lg primary' onClick={handleSubmit}>
					Save
				</button>
			</header>
			<form className='create-note__form' onSubmit={handleSubmit}>
				<input
					type='text'
					autoFocus
					placeholder='Title ...'
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					rows='20'
					placeholder='Note details ...'
					onChange={(e) => setDetails(e.target.value)}
				></textarea>
			</form>
		</section>
	);
}

CreateNote.propTypes = {
	setNotes: PropTypes.func.isRequired,
};
