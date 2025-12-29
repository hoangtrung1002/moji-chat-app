function mapToObject(map?: Map<string, number>) {
  return map ? Object.fromEntries(map.entries()) : {};
}
