import fs from 'node:fs'

const WORDS_PER_MINUTE = 200

interface PostLike {
    body?: string
    filePath?: string
}

/**
 * Estimated reading time for a content-collection entry.
 *
 * Previously this lived as a copy-pasted closure inside both blog/index.astro
 * and blog/[slug].astro.
 */
export function readingTime(post: PostLike): string {
    let content = post.body || ''

    if (!content && post.filePath) {
        try {
            content = fs.readFileSync(post.filePath, 'utf-8')
        } catch {
            // A missing source file just means we fall back to the 1 min floor.
        }
    }

    const words = content.trim().split(/\s+/).filter(Boolean).length
    return `${Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))} min`
}
