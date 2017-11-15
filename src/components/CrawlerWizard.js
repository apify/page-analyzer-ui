import React from 'react';
import generateCrawler, { getScore } from '../lib/CrawlerGenerator';

class CrawlerWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            name: ''
        };
        this.setSelectedOption = this.setSelectedOption.bind(this);
        this.onColumnLabelChange = this.onColumnLabelChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
    }
    componentWillMount() {
        const { searchStrings, searchResults } = this.props;
        const filteredSearchResults = {}
        searchStrings.forEach(searchString => {
            filteredSearchResults[searchString] = [];
            Object.keys(searchResults).forEach((type) => {
                const results = searchResults[type];
                results.forEach(result => {
                    const score = getScore(searchString, type, result);
                    if (score > 0) {
                        filteredSearchResults[searchString].push({
                            path: result.path || result.selector,
                            value: result.value || result.text,
                            type,
                            score,
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
        Object.keys(filteredSearchResults).forEach((searchString) => {
            columns[searchString] = { label: filteredSearchResults[searchString][0].path.split(/[^\w]/).pop(), value: 0 };
        });
        this.setState({
            columns,
            searchResults: filteredSearchResults,
        });
    }
    onColumnLabelChange(searchString, event) {
        const { columns } = this.state;
        const newColumns = {...columns};
        newColumns[searchString].label =  event.target.value;
        this.setState({ columns: newColumns });
    }
    onNameChange(event) {
        this.setState({ name: event.target.value });
    }
    setSelectedOption(searchString, index) {
        const { columns, searchResults } = this.state;
        const newColumns = {...columns};
        const path = searchResults[searchString][index].path;
        const lastSection = path.split(/[^\w]/).pop();
        newColumns[searchString].value = index;
        newColumns[searchString].label = lastSection;
        this.setState({ columns: newColumns });
    }
    getCrawler() {
        const { columns, name, searchResults } = this.state;
        const { url } = this.props
        if (!name) return '';

        const crawler = generateCrawler(url, name, columns, searchResults);
        const blob = new Blob([JSON.stringify(crawler)], { type: 'application/json;charset=utf-8;' });
        var blobUrl = URL.createObjectURL(blob);
        return blobUrl;
    }
    render() {
        const { columns, searchResults, name } = this.state;
        const crawler = this.getCrawler();
        return (
            <div className="crawler-generator">
                <h3>Generate crawler</h3>
                {Object.keys(searchResults).map(searchString => (
                    <div className="search-string-options-section" key={`option_section_${searchString}`}>
                        <strong className="search-string-option-header">Pick an option for: {searchString}</strong>
                        <div className="search-string-options">
                            {searchResults[searchString].map((item, i) => (
                                <div
                                    className={`search-string-option ${i === columns[searchString].value ? 'active' : ''}`}
                                    key={`item_${i}`}
                                    onClick={() => this.setSelectedOption(searchString, i)}
                                >
                                    <div className="state"></div>
                                    <div className="info">
                                        <p className="value">Text: <strong>{item.value.trim()}</strong></p>
                                        <p className="path">Found in <strong>{item.type}:</strong> {item.path}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                {Object.keys(searchResults).map(searchString => (
                    <div className="search-string-labels-section" key={`labels_section_${searchString}`}>
                        <strong className="search-string-label-header">Set label for: {searchString}</strong>
                        <div className="search-string-input">
                            <input
                                value={columns[searchString].label}
                                onChange={(event) => this.onColumnLabelChange(searchString, event) }
                            />
                        </div>
                    </div>
                ))}
                <div className="search-string-name-section">
                    <strong className="search-string-name-header">Set name for the crawler</strong>
                    <div className="search-string-input">
                        <input
                            value={name}
                            onChange={(event) => this.onNameChange(event) }
                        />
                    </div>
                </div>
                {!!name &&
                    <div>
                        <a href={crawler} target="_blank" download="crawler.json">Download json</a>
                    </div>
                }
            </div>
        );
    }
}

export default CrawlerWizard;
