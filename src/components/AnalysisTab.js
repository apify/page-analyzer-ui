import React from 'react';
import ReactJson from 'react-json-view';

const AnalysisTab = ({ isActive, parsed, data, searchResults, additionalData }) => {
    if (!parsed) return false
    if (!isActive) return false

    return (
        <div>
            <p>Found: <strong>{searchResults.length}</strong> results</p>
            {searchResults.length > 0 &&
                <ReactJson
                    iconStyle="square"
                    theme="ashes"
                    name={null}
                    enableClipboard={false}
                    displayObjectSize={false}
                    displayDataTypes={false}
                    src={searchResults.map(result => {
                        if (result.path) {
                            return {
                                path: result.path.length && result.path[0] === '.'
                                    ? result.path.substr(1)
                                    : result.path,
                                value: result.value
                            }
                        }
                        return result
                    })}
                />
            }
            {searchResults.length > 0 && !!data && data !== {} &&
                <p>in</p>
            }
            {searchResults.length > 0 &&!!data && data !== {} &&
                <ReactJson
                    iconStyle="square"
                    theme="ashes"
                    name={null}
                    enableClipboard={false}
                    displayObjectSize={false}
                    displayDataTypes={false}
                    src={data}
                />
            }
        </div>
    )
}

export default AnalysisTab
