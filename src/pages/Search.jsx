import React from 'react';
import Header from "../components/Header";
import Profiles from "../components/Profiles";
import Filters from "../components/Filters";
import ScrollTop from "../components/ScrollTop";
import PropTypes from "prop-types";
import RootStore from "../stores/RootStore";
import {inject, observer} from "mobx-react";
import SearchStore from "../stores/SearchStore";
import SearchPage from "../components/SearchPage";


@inject('rootStore')
@observer
class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      session: Math.random(),
      searchStore: null
    };

    this.resetSearch = this.resetSearch.bind(this);
    this.handleCreateSearchStore = this.handleCreateSearchStore.bind(this);
  }
  componentDidMount() {
    if (this.props.rootStore.options.state === 'idle') {
      this.props.rootStore.options.fetchOptions();
    }
  }
  resetSearch() {
    this.setState({
      session: Math.random(),
      searchStore: null
    });
  }
  handleCreateSearchStore(searchStore) {
    this.setState({
      searchStore: searchStore
    });
  }
  render() {
    let searchSession = null;
    if (
      this.props.rootStore.options.state === 'done' &&
      this.props.rootStore.profile &&
      this.props.rootStore.profile.trackersIsReady
    ) {
      searchSession = (
        <SearchSession key={`${this.props.rootStore.profile.id}_${this.state.session}`} query={this.props.query} onCreateSearchStore={this.handleCreateSearchStore}/>
      )
    }

    return (
      <div>
        <Header {...this.props} searchStore={this.state.searchStore} resetSearch={this.resetSearch}/>
        <div className="content content-row">
          <div className="parameter_box">
            <Profiles searchStore={this.state.searchStore}/>
            <Filters/>
          </div>
          <div className="main">
            {searchSession}
          </div>
        </div>
        <ScrollTop/>
      </div>
    );
  }
}

Search.propTypes = null && {
  rootStore: PropTypes.instanceOf(RootStore),
  query: PropTypes.string,
};

@inject('rootStore')
@observer
class SearchSession extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearchNext = this.handleSearchNext.bind(this);

    /**@type SearchStore*/
    this.searchStore = props.rootStore.createSearch(props.query);
    props.onCreateSearchStore(this.searchStore);
  }
  componentDidMount() {
    this.searchStore.fetchResults();
  }
  componentWillUnmount() {
    this.props.rootStore.destroySearch(this.searchStore);
    this.searchStore = null;
  }
  handleSearchNext(e) {
    e.preventDefault();
    this.searchStore.fetchResults();
  }
  render() {
    const pages = this.searchStore.resultPages.map((searchPageStore, index) => {
      return (
        <SearchPage key={`search-page-${index}`} searchStore={this.searchStore} searchPageStore={searchPageStore}/>
      );
    });

    let moreBtn = null;
    if (this.searchStore.hasNextQuery()) {
      moreBtn = (
        <div key={'more'} className="footer table__footer">
          <a className="loadMore search__submit footer__loadMore" href="#search-next" onClick={this.handleSearchNext}>{
            chrome.i18n.getMessage('loadMore')
          }</a>
        </div>
      );
    }

    return [
      pages,
      moreBtn
    ];
  }
}

SearchSession.propTypes = null && {
  rootStore: PropTypes.instanceOf(RootStore),
  query: PropTypes.string,
  onCreateSearchStore: PropTypes.func,
};

export default Search;