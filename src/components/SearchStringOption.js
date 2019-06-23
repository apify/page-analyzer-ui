import React from 'react';
import FontAwesome from 'react-fontawesome';

const SearchStringOption = ({ inMenu, index, selectedIndex, list, searchString, setSelectedOption, dropdownOpen, toggleDropdown }) => {
    const option = list[index];
    const onClick = inMenu
        ? () => {
            setSelectedOption(searchString, index);
            toggleDropdown(null);
        }
        : () => {}

    const { type, path, foundInLists } = option;
    const value = String(option.value).trim()
    const isInList = foundInLists && foundInLists.length;
    return (
        <div
            className="search-string-option active"
            onClick={onClick}
        >
            <div className="info">
                <p className="value">Text: <strong>{value}</strong></p>
                <p className="path"><strong>{type}:</strong> {path}</p>
            </div>
            {!inMenu &&
                <div className="state">
                    {dropdownOpen
                        ? <FontAwesome name="caret-up" />
                        : <FontAwesome name="caret-down" />
                    }
                </div>
            }
            {!!inMenu && !!isInList &&
                <div className="state">
                    <FontAwesome name="list" />
                </div>
            }
        </div>
    )
}

export default SearchStringOption
