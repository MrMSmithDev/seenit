/* eslint-disable no-console, indent*/
import { firestore } from '@src/firebase'
import {
  collection,
  CollectionReference,
  limit,
  orderBy,
  Query,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where
} from 'firebase/firestore'
import { FilterQuery } from 'src/customTypes/types'

const commentDB: CollectionReference = collection(firestore, 'comments')
const postDB: CollectionReference = collection(firestore, 'posts')

export function setQuery(
  queryConstraints: FilterQuery,
  userID: string | null,
  lastDoc: QueryDocumentSnapshot | null
): Query {
  if (lastDoc) {
    return userID
      ? query(
          postDB,
          where('authorID', '==', userID),
          orderBy(queryConstraints.attribute, queryConstraints.order),
          startAfter(lastDoc),
          limit(10)
        )
      : query(
          postDB,
          orderBy(queryConstraints.attribute, queryConstraints.order),
          startAfter(lastDoc),
          limit(10)
        )
  } else {
    return userID
      ? query(
          postDB,
          where('authorID', '==', userID),
          orderBy(queryConstraints.attribute, queryConstraints.order),
          limit(10)
        )
      : query(postDB, orderBy(queryConstraints.attribute, queryConstraints.order), limit(10))
  }
}

export function setFavoritesQuery(
  queryConstraints: FilterQuery,
  postsList: string[],
  lastDoc: QueryDocumentSnapshot | null
): Query {
  return lastDoc
    ? query(
        postDB,
        where('ID', 'in', postsList),
        orderBy(queryConstraints.attribute, queryConstraints.order),
        startAfter(lastDoc),
        limit(10)
      )
    : query(
        postDB,
        where('ID', 'in', postsList),
        orderBy(queryConstraints.attribute, queryConstraints.order),
        limit(10)
      )
}

export function setPostCommentsQuery(postID: string, lastDoc: QueryDocumentSnapshot | null): Query {
  return lastDoc
    ? query(
        commentDB,
        where('postID', '==', postID),
        orderBy('timeStamp', 'desc'),
        startAfter(lastDoc),
        limit(10)
      )
    : query(commentDB, where('postID', '==', postID), orderBy('timeStamp', 'desc'), limit(10))
}

export function setUserCommentsQuery(userID: string, lastDoc: QueryDocumentSnapshot | null): Query {
  return lastDoc
    ? query(
        commentDB,
        where('authorID', '==', userID),
        orderBy('timeStamp', 'desc'),
        startAfter(lastDoc),
        limit(10)
      )
    : query(commentDB, where('authorID', '==', userID), orderBy('timeStamp', 'desc'), limit(10))
}
