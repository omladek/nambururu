import { JSX } from 'preact'
import { Link } from 'preact-router/match'

import { ChildData } from '../../types/reddit-api/SubredditsResult.type'
import './SubredditCard.css'
import RichText from '../RichText'
import deescapeHtml from '../../utilities/deescapeHtml'
import formatNumber from '../../utilities/formatNumber'
import Storage from '../../constants/storage'
import Button from './components/Button/Button'

interface Props {
  subreddit: ChildData
}

function SubredditCard({ subreddit }: Props): JSX.Element {
  const { display_name, public_description, subscribers, title, url } =
    subreddit

  return (
    <article className="subreddit-card">
      <Link
        className="subreddit-card__title"
        href={`/?subreddit=${display_name}&sort=best`}
      >
        <h2 className="subreddit-card__title-text">
          <span className="subreddit-card__title-url">{url}</span>
          <br />
          {title}
        </h2>
      </Link>
      <p className="subreddit-card__subs">
        subscribers: ({formatNumber(subscribers)})
      </p>
      <div className="subreddit-card__description">
        <RichText html={deescapeHtml(public_description)} />
      </div>
      <div className="subreddit-card__btns">
        {[
          Storage.MY_MIX,
          Storage.MY_SELECTION,
          Storage.MY_BLOCKED_SUBREDDITS,
        ].map((key) => {
          return <Button key={key} storageKey={key} value={display_name} />
        })}
      </div>
    </article>
  )
}

export default SubredditCard
