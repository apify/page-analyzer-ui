import React from 'react'

const AnalysisPreview = ({ heading, done, foundItems, onClick, data, dataLabel, queryLabel, showSearchResultsCounter }) => {

    let isEmpty = false;
    if (!data) isEmpty = true;
    else if (data.length === 0) isEmpty = true;
    else if (Object.keys(data).length === 0) isEmpty = true;

    const dataCount = isEmpty ? 0 : (data.length || Object.keys(data).length);

    if (foundItems) isEmpty = false;

    const classNames = ['analysis-preview'];
    if (foundItems) classNames.push('found');
    if (done) classNames.push('done');
    if (done && isEmpty) classNames.push('empty');
    return (
        <div
            className={classNames.join(' ')}
            onClick={!isEmpty ? onClick : () => {}}
        >
            <div className="name">{heading}</div>
            {!!data &&
                <div className="data-results">{dataLabel} <strong>{dataCount}</strong></div>
            }
            {showSearchResultsCounter &&
                <div className="found-results">{queryLabel} <strong>{foundItems}</strong></div>
            }
        </div>
    )
}

export default AnalysisPreview
