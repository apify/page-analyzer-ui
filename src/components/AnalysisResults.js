import React from 'react';
import { Container, Row, Col, Nav, NavItem, NavLink, Badge } from 'reactstrap';
import { compose, withState } from 'recompose';
import FontAwesome from 'react-fontawesome';
import AnalysisTab from './AnalysisTab';

const AnalysisResults = ({ response, activeTab, setActiveTab }) => {
    if (!response) {
        return false
    }
    const {
        windowPropertiesParsed,
        windowProperties,
        windowPropertiesFound,
        allWindowProperties,
        schemaOrgDataParsed,
        schemaOrgData,
        schemaOrgDataFound,
        metaDataParsed,
        metaData,
        metaDataFound,
        jsonLDDataParsed,
        jsonLDData,
        jsonLDDataFound,
        htmlParsed,
        htmlFound,
        // crawler,
        analysisEnded
    } = response;

    return (
        <div className="AnalysisResults">
            <Container>
                <Row>
                    <Col>
                        <Nav tabs>
                            {!!windowPropertiesParsed &&
                                <NavItem>
                                    <NavLink
                                        className={activeTab === 'window' ? 'active' : ''}
                                        onClick={() => setActiveTab('window')}
                                    >
                                        Window{' '}
                                        <Badge
                                            color={windowPropertiesFound.length ? 'success' : 'secondary'}
                                        >
                                            {windowPropertiesFound.length}
                                        </Badge>
                                    </NavLink>
                                </NavItem>
                            }
                            {!!schemaOrgDataParsed &&
                                <NavItem>
                                    <NavLink
                                        className={activeTab === 'schema' ? 'active' : ''}
                                        onClick={() => setActiveTab('schema')}
                                    >
                                        Schema.org{' '}
                                        <Badge
                                            color={schemaOrgDataFound.length ? 'success' : 'secondary'}
                                        >
                                            {schemaOrgDataFound.length}
                                        </Badge>
                                    </NavLink>
                                </NavItem>
                            }
                            {!!metaDataParsed &&
                                <NavItem>
                                    <NavLink
                                        className={activeTab === 'meta' ? 'active' : ''}
                                        onClick={() => setActiveTab('meta')}
                                    >
                                        Metatags{' '}
                                        <Badge
                                            color={metaDataFound.length ? 'success' : 'secondary'}
                                        >
                                            {metaDataFound.length}
                                        </Badge>
                                    </NavLink>
                                </NavItem>
                            }
                            {!!jsonLDDataParsed &&
                                <NavItem>
                                    <NavLink
                                        className={activeTab === 'json-ld' ? 'active' : ''}
                                        onClick={() => setActiveTab('json-ld')}
                                    >
                                        JSON-LD{' '}
                                        <Badge
                                            color={jsonLDDataFound.length ? 'success' : 'secondary'}
                                        >
                                            {jsonLDDataFound.length}
                                        </Badge>
                                    </NavLink>
                                </NavItem>
                            }
                            {!!htmlParsed &&
                                <NavItem>
                                    <NavLink
                                        className={activeTab === 'html' ? 'active' : ''}
                                        onClick={() => setActiveTab('html')}
                                    >
                                        HTML{' '}
                                        <Badge
                                            color={htmlFound.length ? 'success' : 'secondary'}
                                        >
                                            {htmlFound.length}
                                        </Badge>
                                    </NavLink>
                                </NavItem>
                            }
                            {!analysisEnded &&
                                <NavItem>
                                    <NavLink disabled>
                                        <FontAwesome name="spinner" spin />
                                    </NavLink>
                                </NavItem>
                            }
                        </Nav>
                        <AnalysisTab
                            heading="Window"
                            parsed={windowPropertiesParsed}
                            data={windowProperties}
                            additionalData={allWindowProperties}
                            searchResults={windowPropertiesFound}
                            isActive={activeTab === 'window'}
                        />
                        <AnalysisTab
                            heading="Schema.org"
                            parsed={schemaOrgDataParsed}
                            data={schemaOrgData}
                            searchResults={schemaOrgDataFound}
                            isActive={activeTab === 'schema'}
                        />
                        <AnalysisTab
                            heading="Meta"
                            parsed={metaDataParsed}
                            data={metaData}
                            searchResults={metaDataFound}
                            isActive={activeTab === 'meta'}
                        />
                        <AnalysisTab
                            heading="JSON-LD"
                            parsed={jsonLDDataParsed}
                            data={jsonLDData}
                            searchResults={jsonLDDataFound}
                            isActive={activeTab === 'json-ld'}
                        />
                        <AnalysisTab
                            heading="HTML"
                            parsed={htmlParsed}
                            searchResults={htmlFound}
                            isActive={activeTab === 'html'}
                        />
                        {/* !!crawler && <pre>{crawler}</pre> */}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

const enhance = compose(
    withState('activeTab', 'setActiveTab', 'window')
);

export default enhance(AnalysisResults)
