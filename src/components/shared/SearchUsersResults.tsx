import Loader from './Loader';
import UserCard from './UserCard';

type SearchUsersResultsProps = {
  isSearchFetching: boolean;
  searchedUsers: any;
}
const SearchUsersResults = ({ isSearchFetching, searchedUsers }: SearchUsersResultsProps) => {
  if(isSearchFetching) { 
    return <Loader />
  }
  
  if(searchedUsers && searchedUsers.documents.length > 0) {
    return <UserCard user={searchedUsers.documents} />
  }

  return (
    <p className='text-light-4 mt-10 text-center w-full'>No results found</p>
  )
}

export default SearchUsersResults