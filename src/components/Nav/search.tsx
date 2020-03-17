import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import Axios, { AxiosResponse } from "axios";

import useNotification from "../_Shared/notifications";
import { getCurrentPageSelector } from "../../store/page/selector";
import { PageEnum } from "../../store/page/types";
import { PostResponse } from "../../global/models/post-models";
import { NotificationType } from "../_Shared/notifications/types";
import SearchResults, { SearchModel } from "../_Shared/modals/searchResults";

const Search: React.FC = () => {
  const currentPage = useSelector(getCurrentPageSelector);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([] as SearchModel[]);
  const { notify } = useNotification();

  const search = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchTerm.length < 3) {
      notify(
        "Search Blocked",
        "Need atleast 3 characters to run search",
        NotificationType.Danger
      );
      return;
    }

    let searchUrl = "";

    switch (currentPage.page) {
      case PageEnum.Group:
        searchUrl = "post/search";
        break;
      case PageEnum.Groups:
        searchUrl = "group/search";
      default:
        break;
    }

    try {
      const response = (await Axios.get(searchUrl, {
        params: { term: searchTerm }
      })) as AxiosResponse<PostResponse[]>;

      const searches = response.data.map(v => { return {page: PageEnum.Post, obj: v} as SearchModel;});
    
      setSearchResults(searches);
      setShowSearchResults(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCloseModal = () => {
    setShowSearchResults(false);
  };

  return (
    <form onSubmit={search}>
      <input
        type="search"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
      <button type="submit">
        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
      </button>

      <SearchResults showModal={showSearchResults} toggle={handleCloseModal} results={searchResults} />
    </form>
  );
};

export default Search;
