import React from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Container,
    Row, Col,
    Button,
    Jumbotron,
    Alert,
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import isURL from 'validator/lib/isURL';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup>
      {!!label && <Label>{label}</Label>}
      <Input {...props} />
      {help && <FormText>{help}</FormText>}
    </FormGroup>
  );
}

class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://www.yelp.com/biz/cuisine-of-nepal-san-francisco',
            searchFor: ['Cuisine of Nepal', '3486 Mission St'],
            urlErrorMessage: '',
        };
        this.onURLChange = this.onURLChange.bind(this);
        this.onItemValueChange = this.onItemValueChange.bind(this);
        this.addItem = this.addItem.bind(this);
        this.submit = this.submit.bind(this);
    }

    onURLChange(event) {
        this.setState({ url: event.target.value });
    }

    onItemValueChange(index, event) {
        const newItems = [...this.state.searchFor];
        newItems[index] = event.target.value;
        this.setState({ searchFor: newItems });
    }

    addItem() {
        const newItems = [...this.state.searchFor, ''];
        this.setState({ searchFor: newItems });
    }

    submit() {
        const { url, searchFor } = this.state;
        const { onSubmit } = this.props
        const transformedSearchFor = searchFor.filter(item => !!item)
        let passedValidation = true;

        if (!isURL(url)) {
            this.setState({ urlErrorMessage: 'Please provide valid url address.'});
            return;
        } else {
            this.setState({ urlErrorMessage: ''})
        }

        searchFor.filter(item => item.name && item.value).forEach(item => {
            transformedSearchFor[item.name] = item.value;
        })

        onSubmit({ url, searchFor: transformedSearchFor });
    }
    render() {
        const { url, searchFor, urlErrorMessage } = this.state;
        return (
            <Form className="InputForm">
                <Jumbotron className="website">
                    <div className="wrapper">
                        <h3>Website</h3>
                        {!!urlErrorMessage && <Alert color="danger">{urlErrorMessage}</Alert>}
                        <FieldGroup
                          id="url"
                          type="text"
                          placeholder="Enter URL of the website you want to analyze."
                          value={url}
                          onChange={this.onURLChange}
                        />
                    </div>
                </Jumbotron>

                <Jumbotron className="query">
                    <div className="wrapper">
                        <h3>Data to look for <small>(optional)</small></h3>
                        {searchFor.map((item, index) => (
                            <div className="item-row" key={`item_${index}`}>
                                {searchFor.length > 1 &&
                                    <div className="item-row-remove">
                                        <FontAwesome
                                            name="trash-o"
                                            onClick={() => {
                                                const newSearchFor = [...searchFor];
                                                newSearchFor.splice(index, 1);
                                                this.setState({
                                                    searchFor: newSearchFor,
                                                });
                                            }}
                                        />
                                    </div>
                                }
                                <FieldGroup
                                  id={`item_${index}_value`}
                                  type="text"
                                  placeholder="What are you looking for?"
                                  value={item}
                                  onChange={(event) => this.onItemValueChange(index, event)}
                                />
                            </div>
                        ))}
                        <Button
                            type="button"
                            onClick={this.addItem}
                            color="secondary"
                        >
                            + Add another item
                        </Button>
                    </div>
                </Jumbotron>
                <div className="actions">
                    <div className="wrapper">
                        <Button
                            className="analyze"
                            type="button"
                            onClick={this.submit}
                            color="primary"
                            size="lg"
                            disabled={!url}
                        >
                            Analyze
                        </Button>
                    </div>
                </div>
            </Form>
        );
    }
}

export default InputForm
