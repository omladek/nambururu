import { InfiniteData } from '@tanstack/react-query'
import getUniqueNormalizedPosts from './getUniqueNormalizedPosts'
import {
  ChildData,
  NormalizedPost,
} from '../types/reddit-api/ThreadsResult.type'

const transformListData = (
  data: InfiniteData<{
    posts: ChildData[]
    after: string | null
  }>,
): InfiniteData<NormalizedPost> => ({
  pages: getUniqueNormalizedPosts(data.pages),
  pageParams: data.pageParams,
})

export default transformListData
