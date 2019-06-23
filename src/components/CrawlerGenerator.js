import React from 'react';
import { Jumbotron, UncontrolledDropdown,  DropdownMenu, DropdownToggle } from 'reactstrap';
import generateCrawler, { getScore } from '../lib/generateCrawler';
// import Tooltip from './Tooltip';
import SearchStringOption from './SearchStringOption';
import SearchListDropdown from './SearchListDropdown';

class CrawlerGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: {},
            name: '',
            crawler: '',
            searchStringDropdownOpen: null,
        };
        this.setSelectedOption = this.setSelectedOption.bind(this);
        this.onColumnLabelChange = this.onColumnLabelChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.getCrawler = this.getCrawler.bind(this);
        this.regenerateCrawler = this.regenerateCrawler.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }
    componentWillMount() {
        const { searchStrings, searchResults, url } = this.props;
        const filteredSearchResults = {}
        searchStrings.forEach(searchString => {
            filteredSearchResults[searchString] = [];
            Object.keys(searchResults).forEach((type) => {
                const results = searchResults[type];
                results.forEach(result => {
                    const score = getScore(searchString, type, result);
                    if (score > 0 || results.length === 1) {
                        filteredSearchResults[searchString].push({
                            path: result.path || result.selector,
                            value: result.value || result.text,
                            type,
                            score,
                            foundInLists: result.foundInLists,
                        });
                    }
                });
            });
            filteredSearchResults[searchString].sort((a, b) => {
                if (a.score > b.score) return -1;
                if (a.score < b.score) return 1;
                return 0;
            })
        });
        const columns = {};
        Object.keys(filteredSearchResults)
            .filter(searchString => filteredSearchResults[searchString].length > 0)
            .forEach((searchString) => {
                columns[searchString] = {
                    label: filteredSearchResults[searchString][0].path.split(/[^\w]/).pop(),
                    value: 0,
                };
            });
        this.setState({
            name: url.replace(/.*\/\/([^/]*).*/, '$1'),
            columns,
            searchResults: filteredSearchResults,
        });
    }
    componentDidMount() {
        this.regenerateCrawler();
    }
    onColumnLabelChange(searchString, event) {
        const { columns } = this.state;
        const newColumns = {...columns};
        newColumns[searchString].label =  event.target.value;
        this.setState({ columns: newColumns });
        this.regenerateCrawler();
    }
    onColumnListChange(searchString, list) {
        const { columns } = this.state;
        const newColumns = {...columns};
        newColumns[searchString].list =  list;
        this.setState({ columns: newColumns });
        this.regenerateCrawler();
    }
    onNameChange(event) {
        this.setState({ name: event.target.value });
        this.regenerateCrawler();
    }
    setSelectedOption(searchString, index) {
        const { columns, searchResults } = this.state;
        const newColumns = {...columns};
        const path = searchResults[searchString][index].path;
        const lastSection = path.split(/[^\w]/).pop();
        newColumns[searchString].value = index;
        newColumns[searchString].label = lastSection;
        newColumns[searchString].list = '';
        this.setState({ columns: newColumns });
        this.regenerateCrawler();
    }
    toggleDropdown(searchString) {
        const { searchStringDropdownOpen } = this.state;
        if (searchStringDropdownOpen === searchString) searchString = null;
        this.setState({ searchStringDropdownOpen: searchString });
    }
    getCrawler() {
        const { columns, name, searchResults } = this.state;
        const { url } = this.props
        if (!name) return '';

        const crawler = generateCrawler(url, name, columns, searchResults);
        const blob = new Blob([JSON.stringify(crawler)], { type: 'application/json;charset=utf-8;' });
        var blobUrl = URL.createObjectURL(blob);
        this.setState({ crawler: blobUrl });
    }
    regenerateCrawler() {
        const { name } = this.state;
        if (this.crawlerTimeout) window.clearTimeout(this.crawlerTimeout);
        if (name) {
            this.crawlerTimeout = window.setTimeout(this.getCrawler, 200);
        }

    }
    render() {
        const { columns, searchResults, name, crawler } = this.state;
        if (!columns || Object.keys(columns).length === 0) return false;
        return (
            <Jumbotron className="crawler-generator">
                <div className="wrapper">
                    <h2>
                        Generate Apify Crawler settings <sup>BETA</sup>
                    </h2>
                    <p className="description">
                        But you want to automate this, right?
                        Click the button below to generate <a href="https://www.apify.com/docs/crawler" target="_blank">Apify Crawler</a> settings
                        in a JSON file that you can <a href="https://my.apify.com/crawlers?importFromJson=1" target="_blank">import into the Apify app</a> and
                        start scraping the website at scale. Note that you can customize the names of the attributes as well as their source.
                    </p>
                    <div className="columns">
                        <div className="column labels">
                            <div className="value">Text</div>
                            <div className="field">Field name</div>
                            <div className="source">Data source</div>
                            <div className="list">Scope</div>
                        </div>
                        {Object.keys(searchResults).filter(searchString => !!columns[searchString]).map((searchString, searchIndex) => (
                            <div className="column" key={`search_string_${searchString}`}>
                                <div className="value">{searchString}</div>
                                <div className="fieldLabel label">Field name</div>
                                <div className="field">
                                    <input
                                        value={columns[searchString] && columns[searchString].label}
                                        onChange={(event) => this.onColumnLabelChange(searchString, event) }
                                    />
                                </div>
                                <div className="sourceLabel label">Data source</div>
                                <div className="source">
                                    <UncontrolledDropdown
                                        isOpen={this.state.searchStringDropdownOpen === searchString}
                                        toggle={() => this.toggleDropdown(searchString)}
                                    >
                                        <DropdownToggle
                                          tag="div"
                                          onClick={this.toggle}
                                          data-toggle="dropdown"
                                          aria-expanded={this.state.dropdownOpen}
                                          className="search-string-selected-option"
                                        >
                                            <SearchStringOption
                                                inMenu={false}
                                                index={columns[searchString].value}
                                                selectedIndex={columns[searchString].value}
                                                list={searchResults[searchString]}
                                                dropdownOpen={this.state.dropdownOpen}
                                                setSelectedOption={this.setSelectedOption}
                                                toggleDropdown={this.toggleDropdown}
                                            />
                                        </DropdownToggle>
                                        <DropdownMenu className="search-string-options">
                                            {searchResults[searchString].map((item, i) => (
                                                <SearchStringOption
                                                    key={`item_${i}`}
                                                    inMenu={true}
                                                    index={i}
                                                    selectedIndex={columns[searchString].value}
                                                    list={searchResults[searchString]}
                                                    setSelectedOption={this.setSelectedOption}
                                                    toggleDropdown={this.toggleDropdown}
                                                    searchString={searchString}
                                                />
                                            ))}
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>
                                <div className="listLabel label">List</div>
                                <div className="list">
                                    <SearchListDropdown
                                        item={searchResults[searchString][columns[searchString].value]}
                                        column={columns[searchString]}
                                        onColumnListChange={(list) => this.onColumnListChange(searchString, list)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="search-string-name-section">
                        <strong className="search-string-name-header">Enter name for the crawler</strong>
                        <div className="search-string-input">
                            <input
                                value={name}
                                onChange={(event) => this.onNameChange(event) }
                            />
                        </div>
                    </div>
                    {!!name && !!crawler &&
                        <div className="crawler-download">
                            <a href={crawler} target="_blank" download="crawler.json">Download JSON settings</a>
                        </div>
                    }
                </div>
            </Jumbotron>
        );
    }
}

export default CrawlerGenerator;
