import React from 'react';
import { compose, withState } from 'recompose';
import FontAwesome from 'react-fontawesome';
import AnalysisPreview from './AnalysisPreview';
import AnalysisTab from './AnalysisTab';

const AnalysisResults = ({ response, activeTab, setActiveTab }) => {
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
        metaDataParsed: false,
        metaData: {},
        metaDataFound: [],
        jsonLDDataParsed: false,
        jsonLDData: {},
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
        metaDataParsed,
        metaData,
        metaDataFound,
        jsonLDDataParsed,
        jsonLDData,
        jsonLDDataFound,
        html,
        htmlParsed,
        htmlFound,
        xhrRequestsParsed,
        xhrRequests,
        xhrRequestsFound,
        // crawler,
        analysisEnded
    } = data;

    return (
        <div className="AnalysisResults">
            {!analysisEnded &&
                <div className="loader">
                    <FontAwesome name="spinner" size="4x" spin />
                </div>
            }
            <div className="previews">
                <AnalysisPreview
                    heading="Window"
                    foundItems={windowPropertiesFound.length}
                    done={windowPropertiesParsed}
                    onClick={() => setActiveTab('window')}
                />
                <AnalysisPreview
                    heading="Schema.org"
                    foundItems={schemaOrgDataFound.length}
                    done={schemaOrgDataParsed}
                    onClick={() => setActiveTab('schema')}
                />
                <AnalysisPreview
                    heading="Metadata"
                    foundItems={metaDataFound.length}
                    done={metaDataParsed}
                    onClick={() => setActiveTab('meta')}
                />
                <AnalysisPreview
                    heading="JSON-LD"
                    foundItems={jsonLDDataFound.length}
                    done={jsonLDDataParsed}
                    onClick={() => setActiveTab('json-ld')}
                />
                <AnalysisPreview
                    heading="XHR"
                    foundItems={xhrRequestsFound.length}
                    done={xhrRequestsParsed}
                    onClick={() => setActiveTab('xhr')}
                />
                <AnalysisPreview
                    heading="HTML"
                    foundItems={htmlFound.length}
                    done={htmlParsed}
                    onClick={() => setActiveTab('html')}
                />
            </div>
            <AnalysisTab
                heading="Window"
                parsed={windowPropertiesParsed}
                data={windowProperties}
                additionalData={allWindowProperties}
                searchResults={windowPropertiesFound}
                isActive={activeTab === 'window'}
                clear={() => setActiveTab('')}
            />
            <AnalysisTab
                heading="Schema.org"
                parsed={schemaOrgDataParsed}
                data={schemaOrgData}
                searchResults={schemaOrgDataFound}
                isActive={activeTab === 'schema'}
                clear={() => setActiveTab('')}
            />
            <AnalysisTab
                heading="Meta"
                parsed={metaDataParsed}
                data={metaData}
                searchResults={metaDataFound}
                isActive={activeTab === 'meta'}
                clear={() => setActiveTab('')}
            />
            <AnalysisTab
                heading="JSON-LD"
                parsed={jsonLDDataParsed}
                data={jsonLDData}
                searchResults={jsonLDDataFound}
                isActive={activeTab === 'json-ld'}
                clear={() => setActiveTab('')}
            />
            <AnalysisTab
                heading="XHR"
                parsed={xhrRequestsParsed}
                searchResults={xhrRequestsFound}
                data={xhrRequests}
                isActive={activeTab === 'xhr'}
                clear={() => setActiveTab('')}
            />
            <AnalysisTab
                heading="HTML"
                parsed={htmlParsed}
                htmlData={html}
                searchResults={htmlFound}
                isActive={activeTab === 'html'}
                clear={() => setActiveTab('')}
            />
        </div>
    )
}

const enhance = compose(
    withState('activeTab', 'setActiveTab', '')
);

export default enhance(AnalysisResults)
