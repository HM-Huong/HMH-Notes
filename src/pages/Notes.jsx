import { CiSearch } from "react-icons/ci";
import { BsPlusLg } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

import NoteItem from "../components/NoteItem";

export default function Notes({ notes }) {
	const [showSearch, setShowSearch] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [filteredNotes, setFilteredNotes] = useState(notes);
	const notesContainerRef = useRef();

	useEffect(() => {
		const container = notesContainerRef.current;

		function compute() {
			const dummyElements = container.getElementsByClassName("dummy");
			while (dummyElements[0]) {
				dummyElements[0].remove();
			}

			const noteList = container.children;
			const maxCol =
				parseInt(
					getComputedStyle(container).getPropertyValue("--col")
				) || 2;
			let colHeight = Array(maxCol).fill(0);

			for (const note of noteList) {
				const isMin = minMaxIndex(
					colHeight,
					(min, element) => min > element + 100
				);
				note.style.order = isMin;
				colHeight[isMin] += note.getBoundingClientRect().height;
			}

			let isMax = minMaxIndex(colHeight, (max, element) => max < element);
			container.style.height = colHeight[isMax] + "px";

			for (let i = 0; i < colHeight.length; i++) {
				if (i === isMax) continue;
				let dummy = document.createElement("div");
				dummy.classList.add("dummy");
				dummy.style.order = i;
				dummy.style.height = colHeight[isMax] - colHeight[i] + "px";
				container.appendChild(dummy);
			}
		}

		compute();
		window.addEventListener("resize", compute);
		return () => {
			window.removeEventListener("resize", compute);
		};
	}, [filteredNotes]);

	function handleSearch(e) {
		const content = e.target.value;
		setSearchText(content);
		setFilteredNotes(
			notes.filter((note) => {
				if (
					note.title
						.toLocaleLowerCase()
						.match(content.toLocaleLowerCase())
				) {
					return note;
				}
			})
		);
		// resetNotesLists();
	}

	function handleClickSearchButton() {
		if (showSearch) {
			setSearchText("");
			// resetNotesLists();
			setFilteredNotes(notes);
		}
		setShowSearch(!showSearch);
	}

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
						onChange={(e) => handleSearch(e)}
					/>
				)}
				<button
					className='btn'
					onClick={() => handleClickSearchButton()}
				>
					{showSearch ? <MdClose /> : <CiSearch />}
				</button>
			</header>

			<div className='fit__item'>
				<div className='notes__container' ref={notesContainerRef}>
					{filteredNotes.length === 0 && (
						<p className='empty__notes'>No notes found</p>
					)}

					{filteredNotes.map((note) => (
						<NoteItem key={note.id} note={note} />
					))}
				</div>
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

/**
 * return min or max index of `arr` element according to `cmp` callback function
 * @param arr an array needs to find the min or max element's index
 * @param cmp Take two arguments: current min or max element and array element. If `cmp` returns true, the current min or max index will be replaced by the element's index being compared
 */
function minMaxIndex(arr, cmp) {
	let res = 0;
	for (let i = 0; i < arr.length; ++i) {
		if (cmp(arr[res], arr[i])) {
			res = i;
		}
	}
	return res;
}
