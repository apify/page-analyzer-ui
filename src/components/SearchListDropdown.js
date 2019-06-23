import React from 'react';
import { UncontrolledDropdown,  DropdownMenu, DropdownToggle } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
// import Tooltip from './Tooltip';

const Option = ({ option }) => {
    const { path, label, items } = option;
    return (
        <div className="list-option">
            <div className="path">
            {!!label && label}
            {!!path &&
                <span><strong>Path: </strong> {path}</span>
            }
            </div>
            {!!items.length &&
                <div className="items" >
                    <strong>Items: </strong> {items.length}
                </div>
            }
        </div>
    )
}

class SearchListDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dropdownOpen: false };
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }
    toggleDropdown() {
        const { dropdownOpen } = this.state;
        this.setState({ dropdownOpen: !dropdownOpen })
    }
    render() {
        const { toggleDropdown } = this;
        const { item, column, onColumnListChange } = this.props;
        const { dropdownOpen } = this.state;
        const { foundInLists } = item;
        const { list } = column;
        if (!foundInLists || !foundInLists.length) return 'Just this element';
        const options = [
            { value: '', label: 'Just this element', items: []}
        ]
        foundInLists.forEach((localList, i) => {
            options.push({
                value: i,
                path: `${localList.arrayPath || localList.arraySelector}`,
                items: Object.values(localList.possibleIndexes)
            });
        })
        return (
            <UncontrolledDropdown
                isOpen={dropdownOpen}
                toggle={this.toggleDropdown}
            >
                <DropdownToggle
                  tag="div"
                  onClick={this.toggleDropdown}
                  data-toggle="dropdown"
                  aria-expanded={dropdownOpen}
                >
                    <div className="toggle">
                        <Option option={options.filter(option => (option.value === list) || (typeof list === 'undefined' && option.value === '')).pop()} />
                        <div className="state">
                            {dropdownOpen
                                ? <FontAwesome name="caret-up" />
                                : <FontAwesome name="caret-down" />
                            }
                        </div>
                    </div>
                </DropdownToggle>
                <DropdownMenu className="dropdown-list-options">
                    {options.map((item, i) => (
                        <div
                            className="dropdown-list-option"
                            key={`dropdown-list-option-${item.value}`}
                            onClick={() => {
                                toggleDropdown();
                                onColumnListChange(item.value);
                            }}
                        >
                            <Option option={item} />
                        </div>
                    ))}
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }
}

export default SearchListDropdown
