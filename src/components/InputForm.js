import React from 'react';
import { Form, FormGroup, Label, Input, FormText, Container, Row, Col, Button } from 'reactstrap';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup>
      <Label>{label}</Label>
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
        searchFor.filter(item => item.name && item.value).forEach(item => {
            transformedSearchFor[item.name] = item.value;
        })
        console.log({ url, searchFor: transformedSearchFor });
        onSubmit({ url, searchFor: transformedSearchFor });
    }
    render() {
        const { url, searchFor } = this.state;
        return (
            <Form className="InputForm">
                <Container>
                    <Row>
                        <Col>
                            <FieldGroup
                              id="url"
                              type="text"
                              label="Page URL"
                              placeholder="Enter url"
                              value={url}
                              onChange={this.onURLChange}
                            />
                        </Col>
                    </Row>
                    {searchFor.map((item, index) => (
                        <Row key={`item_${index}`}>
                            <Col>
                                <FieldGroup
                                  id={`item_${index}_name`}
                                  type="text"
                                  label="Item name"
                                  placeholder="Enter name of the item"
                                  value={item.name}
                                  onChange={(event) => this.onItemNameChange(index, event)}
                                />
                            </Col>
                            <Col>
                                <FieldGroup
                                  id={`item_${index}_value`}
                                  type="text"
                                  label="Item value"
                                  placeholder="Enter value of the item"
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
                                +
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center">
                            <Button
                                type="button"
                                onClick={this.submit}
                                color="primary"
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
