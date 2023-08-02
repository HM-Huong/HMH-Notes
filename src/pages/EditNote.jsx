import { IoIosArrowBack } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';

import useCreateDate from '../hooks/useCreateDate';

export default function EditNote({ notes, setNotes }) {
	const { id } = useParams(); // this is a string
	// do not use strict equality if you use dummy_notes because the id of dummy note is a number
	const note = notes.find((item) => item.id == id);
	const [title, setTitle] = useState(note.title);
	const [details, setDetails] = useState(note.details);
	const date = useCreateDate();
	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();
		if (title && details) {
			const newNote = {
				...note,
				title,
				details,
				date,
			};
			setNotes(
				notes.map((item) => {
					if (item.id == id) {
						item = newNote;
					}
					return item;
				})
			);
			navigate('/');
		}
	}

	function handleRemove() {
		setNotes(notes.filter((item) => item.id != id));
		navigate('/');
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
				<button className='btn lg danger' onClick={handleRemove}>
					<RiDeleteBin6Line />
				</button>
			</header>
			<form className='create-note__form' onSubmit={handleSubmit}>
				<input
					type='text'
					autoFocus
					placeholder='Title ...'
					onChange={(e) => setTitle(e.target.value)}
					value={title}
				/>
				<textarea
					rows='20'
					placeholder='Note details ...'
					onChange={(e) => setDetails(e.target.value)}
					value={details}
				></textarea>
			</form>
		</section>
	);
}

EditNote.propTypes = {
	notes: PropTypes.array.isRequired,
	setNotes: PropTypes.func.isRequired,
};
