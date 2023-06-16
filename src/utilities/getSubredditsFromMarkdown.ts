export interface RedditWikiPage {
  kind: 'wikipage' | string
  data: {
    content_md: string
  }
}

const getSubredditsFromMarkdown = ({
  data,
  kind,
}: RedditWikiPage): string[] => {
  if (kind !== 'wikipage') {
    return []
  }

  const { content_md } = data

  const subredditRegex = /\/r\/(\w+)/g
  const subreddits = Array.from(
    content_md.matchAll(subredditRegex),
    (match) => match[1],
  )

  return Array.from(new Set(subreddits))
}

export default getSubredditsFromMarkdown
