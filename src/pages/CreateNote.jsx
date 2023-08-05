import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";

import useCreateDate from "../hooks/useCreateDate";
import escapeHTML from "../utils/escapeHTML";

export default function CreateNote({ setNotes }) {
	const [title, setTitle] = useState("");
	const [details, setDetails] = useState("");
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
			navigate("/");
		}
	}

	return (
		<section className='fit__container'>
			<header className='create-note__header fit__content-size'>
				<Link to='/' className='btn'>
					<IoIosArrowBack />
				</Link>
				<button className='btn lg primary' onClick={handleSubmit}>
					Save
				</button>
			</header>
			<form
				className='create-note__form fit__item'
				onSubmit={handleSubmit}
			>
				<input
					className='fit__content-size'
					type='text'
					autoFocus
					placeholder='Title ...'
					onChange={(e) => setTitle(e.target.value)}
				/>
				<div
					className='fit__item'
					contentEditable
					placeholder='Note details ...'
					onBlur={(e) => {
						setDetails(escapeHTML(e.currentTarget.textContent));
					}}
					dangerouslySetInnerHTML={{ __html: details }}
				></div>
			</form>
		</section>
	);
}

CreateNote.propTypes = {
	setNotes: PropTypes.func.isRequired,
};
