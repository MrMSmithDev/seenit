/* eslint-disable no-console, indent*/
import { firestore } from '@src/firebase'
import {
  collection,
  CollectionReference,
  limit,
  orderBy,
  query,
  Query,
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

export function setCommentsQuery(userID: string, lastDoc: QueryDocumentSnapshot | null): Query {
  return lastDoc
    ? query(commentDB, where('authorID', '==', userID), orderBy('timestamp', 'desc'), limit(10))
    : query(
        commentDB,
        where('authorID', '==', userID),
        orderBy('timestamp', 'desc'),
        startAfter(lastDoc),
        limit(10)
      )
}
