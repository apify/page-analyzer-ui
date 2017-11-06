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
            url: '',
            searchFor: [
                { name: '', value: '' },
            ],
            errorMessage: '',
        };
        this.onURLChange = this.onURLChange.bind(this);
        this.onItemNameChange = this.onItemNameChange.bind(this);
        this.onItemValueChange = this.onItemValueChange.bind(this);
        this.addItem = this.addItem.bind(this);
        this.submit = this.submit.bind(this);
    }
    onURLChange(event) {
        this.setState({ url: event.target.value });
    }
    onItemNameChange(index, event) {
        const newItems = [...this.state.searchFor];
        newItems[index].name = event.target.value;
        this.setState({ searchFor: newItems });
    }
    onItemValueChange(index, event) {
        const newItems = [...this.state.searchFor];
        newItems[index].value = event.target.value;
        this.setState({ searchFor: newItems });
    }
    addItem() {
        const newItems = [...this.state.searchFor, { name: '', value: '' }];
        this.setState({ searchFor: newItems });
    }
    submit() {
        const { url, searchFor } = this.state;
        const { onSubmit } = this.props
        const transformedSearchFor = {};
        const unfinishedItems = searchFor.filter(item => (!item.name && item.value) || (item.name && !item.value))
        if (unfinishedItems.length) {
            this.setState({ errorMessage: 'Please specify both label and value for all query items.'});
            return;
        } else {
            this.setState({ errorMessage: ''})
        }
        searchFor.filter(item => item.name && item.value).forEach(item => {
            transformedSearchFor[item.name] = item.value;
        })
        onSubmit({ url, searchFor: transformedSearchFor });
    }
    render() {
        const { url, searchFor, errorMessage } = this.state;
        return (
            <Form className="InputForm">
                <Container>
                    <Row>
                        <Col>
                            <h3>Website</h3>
                            <FieldGroup
                              id="url"
                              type="text"
                              label="Website's url"
                              placeholder="Enter url of the page you wish to analyze"
                              value={url}
                              onChange={this.onURLChange}
                            />
                        </Col>
                    </Row>
                </Container>

                <Jumbotron className="query">
                    <Container>
                        <h3>Query</h3>
                        {!!errorMessage && <Alert color="danger">{errorMessage}</Alert>}
                        {searchFor.map((item, index) => (
                            <Row key={`item_${index}`}>
                                <Col>
                                    <FieldGroup
                                      id={`item_${index}_name`}
                                      type="text"
                                      label={index === 0 ? "Query item's label" : ''}
                                      placeholder="Enter label for the value you are looking for"
                                      value={item.name}
                                      onChange={(event) => this.onItemNameChange(index, event)}
                                    />
                                </Col>
                                <Col>
                                    <FieldGroup
                                      id={`item_${index}_value`}
                                      type="text"
                                      label={index === 0 ? "Query item's value" : ''}
                                      placeholder="Enter the value you are looking for."
                                      value={item.value}
                                      onChange={(event) => this.onItemValueChange(index, event)}
                                    />
                                </Col>
                            </Row>
                        ))}
                        <Row>
                            <Col>
                                <Button
                                    type="button"
                                    onClick={this.addItem}
                                    color="secondary"
                                >
                                    + Add another query
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
                <Container>
                    <Row>
                        <Col className="text-center">
                            <Button
                                type="button"
                                onClick={this.submit}
                                color="primary"
                                size="lg"
                                disabled={!url}
                            >
                                Analyze
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Form>
        );
    }
}

export default InputForm
