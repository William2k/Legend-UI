import React, { FormEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import Axios, { AxiosResponse } from "axios";

import { getCurrentPageSelector } from "../../store/page/selector";
import { PageEnum } from "../../store/page/types";
import { PostResponse } from "../../global/models/post-models";

const Search: React.FC = () => {
  const currentPage = useSelector(getCurrentPageSelector);
  const [searchTerm, setSearchTerm] = useState("");

  const search = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(searchTerm.length < 3) {
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
    </form>
  );
};

export default Search;
