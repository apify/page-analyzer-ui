import React from 'react';
import { compose, withState } from 'recompose';
import { Button } from 'reactstrap';
import ReactJson from 'react-json-view';
import FontAwesome from 'react-fontawesome';
import AnalysisPreview from './AnalysisPreview';
import AnalysisTab from './AnalysisTab';

const AnalysisResults = ({ response, activeTab, setActiveTab, showCrawler, setShowCrawler }) => {
    if (!response) {
        return false
    }
    const defaultValues = {
        analysisStarted: false,
        analysisEnded: false,
        pageNavigated: null,
        initialResponse: null,
        windowPropertiesParsed: false,
        windowProperties: {},
        windowPropertiesFound: [],
        allWindowProperties: {},
        schemaOrgDataParsed: false,
        schemaOrgData: {},
        schemaOrgDataFound: [],
        allSchemaOrgData: {},
        metaDataParsed: false,
        metaData: {},
        metaDataFound: [],
        jsonLDDataParsed: false,
        jsonLDData: {},
        allJsonLDData: {},
        jsonLDDataFound: [],
        html: '',
        htmlParsed: false,
        htmlFound: [],
        xhrRequestsParsed: false,
        xhrRequests: [],
        xhrRequestsFound: [],
        crawler: '',
        scrappingFinished: null,
        screenshot: '',
        error: null,
        pageError: null,
    }
    const data = Object.assign({}, defaultValues, response)
    const {
        windowPropertiesParsed,
        windowProperties,
        windowPropertiesFound,
        allWindowProperties,
        schemaOrgDataParsed,
        schemaOrgData,
        schemaOrgDataFound,
        allSchemaOrgData,
        metaDataParsed,
        metaData,
        metaDataFound,
        jsonLDDataParsed,
        jsonLDData,
        jsonLDDataFound,
        allJsonLDData,
        html,
        htmlParsed,
        htmlFound,
        xhrRequestsParsed,
        xhrRequests,
        xhrRequestsFound,
        crawler,
        analysisEnded,
        screenshot,
    } = data;

    const totalFoundResults = windowPropertiesFound.length +
        schemaOrgDataFound.length +
        metaDataFound.length +
        htmlFound.length +
        jsonLDDataFound.length;

    return (
        <div className="AnalysisResults">
            {!analysisEnded &&
                <div className="loader">
                    <FontAwesome name="spinner" size="4x" spin />
                </div>
            }
            {!!analysisEnded &&
                <h2>Analysis results</h2>
            }
            <div className="previews">
                <AnalysisPreview
                    heading="Window"
                    foundItems={windowPropertiesFound.length}
                    data={allWindowProperties}
                    dataLabel="Variables found: "
                    queryLabel="Search results: "
                    done={windowPropertiesParsed}
                    onClick={() => {
                        setActiveTab('window');
                    }}
                />
                <AnalysisPreview
                    heading="Schema.org"
                    foundItems={schemaOrgDataFound.length}
                    done={schemaOrgDataParsed}
                    onClick={() => {
                        setActiveTab('schema');
                    }}
                    data={allSchemaOrgData}
                    dataLabel="Top level scopes found: "
                    queryLabel="Search results: "
                />
                <AnalysisPreview
                    heading="Metadata"
                    foundItems={metaDataFound.length}
                    done={metaDataParsed}
                    onClick={() => {
                        setActiveTab('meta');
                    }}
                    data={metaData}
                    dataLabel="Metatags found: "
                    queryLabel="Search results: "
                />
                <AnalysisPreview
                    heading="JSON-LD"
                    foundItems={jsonLDDataFound.length}
                    done={jsonLDDataParsed}
                    onClick={() => {
                        setActiveTab('json-ld');
                    }}
                    data={allJsonLDData}
                    dataLabel="JSON-LD tags found: "
                    queryLabel="Search results: "
                />
                <AnalysisPreview
                    heading="XHR"
                    foundItems={xhrRequestsFound.length}
                    done={xhrRequestsParsed}
                    onClick={() => {
                        setActiveTab('xhr');
                    }}
                    data={xhrRequests}
                    dataLabel="Data XHR requests found: "
                    queryLabel="Search results: "
                />
                <AnalysisPreview
                    heading="HTML"
                    foundItems={htmlFound.length}
                    done={htmlParsed}
                    onClick={() => {
                        setActiveTab('html');
                    }}
                    data={null}
                    queryLabel="Selectors found: "
                />
            </div>
            <AnalysisTab
                heading="Window"
                tooltip="Properties of window object of the fully loaded page."
                parsed={windowPropertiesParsed}
                data={windowProperties}
                additionalData={allWindowProperties}
                searchResults={windowPropertiesFound}
                isActive={activeTab === 'window'}
                clear={() => {
                    setActiveTab('');
                }}
            />
            <AnalysisTab
                heading="Schema.org"
                tooltip="Structured data found in the content of the webpage."
                parsed={schemaOrgDataParsed}
                data={schemaOrgData}
                additionalData={allSchemaOrgData}
                searchResults={schemaOrgDataFound}
                isActive={activeTab === 'schema'}
                clear={() => {
                    setActiveTab('');
                }}
            />
            <AnalysisTab
                heading="Meta"
                tooltip="Content of meta tags of the page."
                parsed={metaDataParsed}
                data={metaData}
                searchResults={metaDataFound}
                isActive={activeTab === 'meta'}
                clear={() => {
                    setActiveTab('');
                }}
            />
            <AnalysisTab
                heading="JSON-LD"
                tooltip="Structured data in JSON format found in the script tag in the HEAD element."
                parsed={jsonLDDataParsed}
                data={jsonLDData}
                additionalData={allJsonLDData}
                searchResults={jsonLDDataFound}
                isActive={activeTab === 'json-ld'}
                clear={() => {
                    setActiveTab('');
                }}
            />
            <AnalysisTab
                heading="XHR"
                tooltip="XHR Requests requested by the fully loaded webpage."
                parsed={xhrRequestsParsed}
                searchResults={xhrRequestsFound}
                data={xhrRequests}
                isActive={activeTab === 'xhr'}
                clear={() => {
                    setActiveTab('');
                }}
            />
            <AnalysisTab
                heading="HTML"
                parsed={htmlParsed}
                htmlData={html}
                searchResults={htmlFound}
                isActive={activeTab === 'html'}
                clear={() => {
                    setActiveTab('');
                }}
            />
            {!!screenshot &&
                <div className="screenshot-wrapper">
                    <h2>Page screenshot</h2>
                    <img alt="Page screenshot" src={`data:image/png;base64,${screenshot}`} />
                </div>
            }
            {!!crawler && totalFoundResults > 0 &&
                <div className="crawler">
                    {!showCrawler
                        ?
                        <Button color="primary" onClick={() => setShowCrawler(true)}>
                            Generate crawler
                        </Button>
                        :
                        <p>Crawler generated: Just save the code bellow to a .json file and then import it in your profile</p>
                    }
                    {!!showCrawler &&
                        <ReactJson
                            iconStyle="square"
                            theme="rjv-default"
                            name={null}
                            enableClipboard={true}
                            displayObjectSize={false}
                            displayDataTypes={false}
                            collapsed={3}
                            src={crawler}
                        />
                    }
                </div>
            }
        </div>
    )
}

const enhance = compose(
    withState('activeTab', 'setActiveTab', ''),
    withState('showCrawler', 'setShowCrawler', false)
);

export default enhance(AnalysisResults)
