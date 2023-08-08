import { IoIosArrowBack } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import xss from "xss";

import useCreateDate from "../hooks/useCreateDate";

export default function EditNote({ notes, setNotes }) {
	const navigate = useNavigate();
	const { id } = useParams(); // this is a string
	// do not use strict equality if you use dummy_notes because the id of dummy note is a number
	const note = notes.find((item) => item.id == id);
	const [title, setTitle] = useState(note?.title || "");
	const [details, setDetails] = useState(note?.details || "");
	const date = useCreateDate();

		if (!note) {
			navigate("/404");
		}

	function handleSubmit(e) {
		e.preventDefault();
		if (title && details) {
			const newNote = {
				...note,
				title,
				details,
				date,
			};
			setNotes([newNote, ...notes.filter((item) => item.id != id)]);
			navigate("/");
		}
	}

	function handleRemove() {
		setNotes(notes.filter((item) => item.id != id));
		navigate("/");
	}

	document.title = title || "HMH Notes";

	return (
		<section className='fit__container'>
			<header className='create-note__header fit__content-size'>
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
			<form className='create-note__form fit__item' onSubmit={handleSubmit}>
				<input
					className='fit__content-size'
					type='text'
					autoFocus
					placeholder='Title ...'
					onChange={(e) => setTitle(e.target.value)}
					value={title}
				/>
				<div
					className='fit__item'
					contentEditable
					placeholder='Note details ...'
					onBlur={(e) => {
						setDetails(xss(e.currentTarget.innerHTML));
					}}
					dangerouslySetInnerHTML={{
						__html: xss(details),
					}}
				></div>
			</form>
		</section>
	);
}

EditNote.propTypes = {
	notes: PropTypes.array.isRequired,
	setNotes: PropTypes.func.isRequired,
};
