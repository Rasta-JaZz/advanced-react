export default function keyToIds(map) {
	for (let id in map) {
		map[id] = { ...map[id], id: id }
	}
	return map
}
