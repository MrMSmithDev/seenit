/* eslint-disable no-console, indent*/
import {
  collection,
  CollectionReference,
  getFirestore,
  limit,
  orderBy,
  query,
  Query,
  QueryDocumentSnapshot,
  startAfter,
  where
} from 'firebase/firestore'
import { FilterQuery } from 'src/customTypes/types'

const postDB: CollectionReference = collection(getFirestore(), 'posts')

export function setQuery(
  queryConstraints: FilterQuery,
  userID: string | null,
  lastDoc: QueryDocumentSnapshot | null
): Query {
  let queryToSet: Query
  if (lastDoc) {
    queryToSet = userID
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
    queryToSet = userID
      ? query(
          postDB,
          where('authorID', '==', userID),
          orderBy(queryConstraints.attribute, queryConstraints.order),
          limit(10)
        )
      : query(postDB, orderBy(queryConstraints.attribute, queryConstraints.order), limit(10))
  }
  return queryToSet
}

// export function setFavoritesQuery(
//   queryConstraints: FilterQuery,
//   postsList: string[],
//   lastDoc: QueryDocumentSnapshot | null
// ): Query {
//   return lastDoc
//     ? query(
//         postDB,
//         where('postID', 'in', postsList),
//         orderBy(queryConstraints.attribute, queryConstraints.order),
//         startAfter(lastDoc),
//         limit(10)
//       )
//     : query(
//       postDB,
//       orderBy(queryConstraints.attribute, queryConstraints.order)
//     )
// }
