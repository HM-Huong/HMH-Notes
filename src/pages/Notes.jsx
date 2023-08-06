import { CiSearch } from "react-icons/ci";
import { BsPlusLg } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import NoteItem from "../components/NoteItem";
import { useEffect, useRef, useState } from "react";

export default function Notes({ notes }) {
	const [showSearch, setShowSearch] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [filteredNotes, setFilteredNotes] = useState(notes);
	const [notesLists, setNotesLists] = useState({
		left: [],
		right: [],
	});
	const [leftHeight, setLeftHeight] = useState(0);
	const [rightHeight, setRightHeight] = useState(0);

	function handleSearch() {
		setFilteredNotes(
			notes.filter((note) => {
				if (
					note.title
						.toLocaleLowerCase()
						.match(searchText.toLocaleLowerCase())
				) {
					return note;
				}
			})
		);

		setNotesLists({
			left: [],
			right: [],
		});
	}

	useEffect(handleSearch, [searchText, notes]);

	useEffect(() => {
		const { right, left } = notesLists;
		const length = right.length + left.length;
		if (length >= filteredNotes.length) return;

		if (leftHeight > rightHeight) {
			right.push(filteredNotes[length]);
		} else if (leftHeight < rightHeight) {
			left.push(filteredNotes[length]);
		} else if (left.length > right.length) {
			// temporarily fix strict mode 2 times rendering
			right.push(filteredNotes[length]);
		} else {
			left.push(filteredNotes[length]);
		}

		setNotesLists({ left, right });
	}, [leftHeight, rightHeight]);

	useEffect(() => {
		if (!showSearch) {
			setSearchText("");
		}
	}, [showSearch]);

	return (
		<section className='fit__container'>
			<header className='notes__header fit__content-size'>
				{!showSearch && <h2>My Notes</h2>}
				{showSearch && (
					<input
						type='text'
						autoFocus
						placeholder='Keyword ...'
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
					/>
				)}
				<button
					className='btn'
					onClick={() => setShowSearch((prev) => !prev)}
				>
					{showSearch ? <MdClose /> : <CiSearch />}
				</button>
			</header>

			<div className='fit__item notes__container'>
				{filteredNotes.length === 0 && (
					<p className='empty__notes'>No notes found</p>
				)}

				<NotesList
					className='notes__list right'
					list={notesLists.left}
					setHeight={setLeftHeight}
				/>
				<NotesList
					className='notes__list left'
					list={notesLists.right}
					setHeight={setRightHeight}
				/>
			</div>

			<Link to='/create-note' className='btn add__btn'>
				<BsPlusLg />
			</Link>
		</section>
	);
}

Notes.propTypes = {
	notes: PropTypes.array.isRequired,
};

function NotesList({ list, className, setHeight }) {
	const listRef = useRef();

	useEffect(() => {
		setHeight(listRef.current.scrollHeight);
	});

	return (
		<div className={className} ref={listRef}>
			{list.map((note) => (
				<NoteItem key={note.id} note={note} />
			))}
		</div>
	);
}

NotesList.propTypes = {
	list: PropTypes.array.isRequired,
	className: PropTypes.string.isRequired,
	setHeight: PropTypes.func,
};
