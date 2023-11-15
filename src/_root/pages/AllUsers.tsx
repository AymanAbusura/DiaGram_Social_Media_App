import Loader from "@/components/shared/Loader";
import SearchUsersResults from "@/components/shared/SearchUsersResults";
import UserCard from "@/components/shared/UserCard";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import useDebounce from "@/hooks/useDebounce";
import { useGetUsers, useSearchUsers } from "@/lib/react-query/queriesAndMutations";
import { useState } from "react";

const AllUsers = () => {
  const { data: creators, isPending, isError: isErrorCreators } = useGetUsers();

  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: searchedUsers, isFetching: isSearchFetching } = useSearchUsers(debouncedSearch);

  const { toast } = useToast();

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });
    
    return;
  }

  if(!creators) {
    return (
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    )
  }
  const shouldShowSearchResults = searchValue || '';
  const shouldShowUsers = !shouldShowSearchResults && creators?.documents.every((item) => item.length === 0 );

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        <div className='explore-inner_container'>
          <div className='flex gap-1 px-4 w-full rounded-lg bg-dark-4'>
            <img src='/assets/icons/search.svg' alt='search' width={24} height={24} />
            <Input type='text' placeholder='Search' className='explore-search' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          </div>
      </div>
      <div className='flex-between w-full max-w-5xl mt-16 mb-7'>
        <h3 className='body-bold md:h3-bold'>Users</h3>
        <div className='flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer'>
          <p className='small-medium md:base-medium text-light-2'>All</p>
          <img src='/assets/icons/filter.svg' alt='filter' width={20} height={20} />
        </div>
      </div>
      <div>
        {isPending && !creators ? (
          <Loader />
        ) : 
        (
          <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
            {shouldShowSearchResults ? (
              <SearchUsersResults isSearchFetching={isSearchFetching} searchedUsers={searchedUsers} />
            ) : shouldShowUsers ? (
              <p className='text-light-4 mt-10 text-center w-full'>No more users</p>
            ) : creators.documents.map((creator) => (
              <li key={creator.$id} className="flex-1 min-w-[200px] w-full  ">
                <UserCard user={creator} />
              </li>
            ))}
          </div>
        )}
            </div>
      </div>
    </div>
  );
};

export default AllUsers;