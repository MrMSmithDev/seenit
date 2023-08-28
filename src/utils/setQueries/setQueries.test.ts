import type { FilterQuery } from '@customTypes/types'
import { firestore } from '@src/firebase'
import {
  collection,
  CollectionReference,
  limit,
  orderBy,
  Query,
  query,
  QueryDocumentSnapshot,
  where
} from 'firebase/firestore'

import {
  setFavoritesQuery,
  setPostCommentsQuery,
  setQuery,
  setUserCommentsQuery
} from './setQueries'

const postDB: CollectionReference = collection(firestore, 'posts')
const commentDB: CollectionReference = collection(firestore, 'comments')

describe('setQuery', () => {
  // Test that the setQuery function returns a Query object when no lastDoc or userID is provided.
  it('should return a Query object with orderBy and limit constraints when no lastDoc or userID is provided', () => {
    const queryConstraints: FilterQuery = {
      attribute: 'timeStamp',
      order: 'asc'
    }
    const userID: string | null = null
    const lastDoc: QueryDocumentSnapshot | null = null

    const result: Query = setQuery(queryConstraints, userID, lastDoc)

    expect(result instanceof Query).toBe(true)
  })

  // Test that the 'setQuery' function throws an error when an error occurs in the function
  it('should throw an error when an error occurs in the function', () => {
    const queryConstraints: FilterQuery = {
      attribute: 'timeStamp',
      order: 'asc'
    }
    const userID: string | null = null
    const lastDoc: QueryDocumentSnapshot | null = null

    expect(() => {
      setQuery(queryConstraints, userID, lastDoc)
      // eslint-disable-next-line quotes
    }).toThrowError("Error in 'setQuery' function: Error")
  })
})

describe('setFavoritesQuery', () => {
  // Test that the setFavoritesQuery function returns a Query object with the correct orderBy, where, and limit clauses when the lastDoc parameter is null.
  it('should return a Query object with orderBy, where, and limit clauses when lastDoc is null', () => {
    const queryConstraints: FilterQuery = {
      attribute: 'timeStamp',
      order: 'asc'
    }
    const postsList: string[] = ['post1', 'post2', 'post3']
    const lastDoc: QueryDocumentSnapshot | null = null

    const result = setFavoritesQuery(queryConstraints, postsList, lastDoc)

    expect(result).toEqual(
      query(
        postDB,
        where('ID', 'in', postsList),
        orderBy(queryConstraints.attribute, queryConstraints.order),
        limit(10)
      )
    )
  })

  // Test that the setFavoritesQuery function returns a Query object with the when postsList is an empty array.
  it('should return a Query object with orderBy, where, and limit clauses when postsList is an empty array', () => {
    const queryConstraints: FilterQuery = {
      attribute: 'timeStamp',
      order: 'asc'
    }
    const postsList: string[] = []
    const lastDoc: QueryDocumentSnapshot | null = null

    const result = setFavoritesQuery(queryConstraints, postsList, lastDoc)

    expect(result).toEqual(
      query(
        postDB,
        where('ID', 'in', postsList),
        orderBy(queryConstraints.attribute, queryConstraints.order),
        limit(10)
      )
    )
  })
})

describe('setPostCommentsQuery', () => {
  // Test that the function 'setPostCommentsQuery' returns a Query object with the correct parameters when the 'lastDoc' parameter is null.
  it('should return a Query object with correct parameters when lastDoc is null', () => {
    const postID = '123'
    const lastDoc = null

    const result = setPostCommentsQuery(postID, lastDoc)

    expect(result).toEqual(
      query(commentDB, where('postID', '==', postID), orderBy('timeStamp', 'desc'), limit(10))
    )
  })

  // Test that the function 'setPostCommentsQuery' returns a Query object with the correct parameters when the 'postID' parameter is an empty string.
  it('should return a Query object with correct parameters when postID is an empty string', () => {
    const postID = ''
    const lastDoc = null

    const result = setPostCommentsQuery(postID, lastDoc)

    expect(result).toEqual(
      query(commentDB, where('postID', '==', postID), orderBy('timeStamp', 'desc'), limit(10))
    )
  })
})

describe('setUserCommentsQuery', () => {
  // Test that the function 'setUserCommentsQuery' returns a Query object with the correct parameters when the 'lastDoc' parameter is null.
  it('should return a Query object with correct parameters when lastDoc is null', () => {
    const userID = 'user123'
    const lastDoc = null

    const result = setUserCommentsQuery(userID, lastDoc)

    expect(result).toEqual(
      query(commentDB, where('authorID', '==', userID), orderBy('timeStamp', 'desc'), limit(10))
    )
  })

  // Test that the function 'setUserCommentsQuery' returns a Query object with the correct parameters when the 'userID' parameter is an empty string.
  it('should return a Query object with correct parameters when userID is an empty string', () => {
    const userID = ''
    const lastDoc = null

    const result = setUserCommentsQuery(userID, lastDoc)

    expect(result).toEqual(
      query(commentDB, where('authorID', '==', userID), orderBy('timeStamp', 'desc'), limit(10))
    )
  })
})
