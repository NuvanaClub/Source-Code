/**
 * Utility function to parse tags from database
 * Handles both JSON array format and comma-separated string format
 */
export function parseTags(tags) {
  if (!tags) return [];
  
  try {
    // Try to parse as JSON first
    const parsed = JSON.parse(tags);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // If JSON parsing fails, split by comma and clean up
    return tags.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
  }
}

/**
 * Convert tags array to comma-separated string for database storage
 */
export function stringifyTags(tags) {
  if (!Array.isArray(tags)) return '';
  return tags.join(', ');
}
