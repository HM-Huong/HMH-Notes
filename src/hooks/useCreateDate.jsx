const monthNames = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

export default function useCreateDate() {
	const dateObj = new Date();
	const month = monthNames[dateObj.getMonth()];
	const date = `${dateObj.getDate()} ${month} ${dateObj.getFullYear()}, at ${dateObj.getHours()}:${dateObj.getMinutes()}`;
	return date;
}
