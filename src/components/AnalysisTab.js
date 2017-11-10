import React from 'react';
import ReactJson from 'react-json-view';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Tooltip from './Tooltip';

const AnalysisTab = ({ isActive, tooltip, parsed, data, searchResults, additionalData, clear, heading }) => {
    if (!parsed) return false;

    const hasData = !!data && data !== {} && data !== [];
    const hasAdditionalData = !!additionalData && additionalData !== {} && additionalData !== [];

    return (
        <Modal
            isOpen={isActive}
            toggle={() => clear()}
            backdrop={true}
            size="large"
            className="analysis-tab"
        >
          <ModalHeader toggle={() => clear()}>
              {tooltip ? <Tooltip title={tooltip} containerClass="analysis-tab">{heading}</Tooltip> : heading}
          </ModalHeader>
          <ModalBody>
              {searchResults.length > 0 &&
                  <p>We found:</p>
              }
              {searchResults.length > 0 &&
                  <div className="found-results">
                      <ReactJson
                          iconStyle="square"
                          theme="rjv-default"
                          name={null}
                          enableClipboard={false}
                          displayObjectSize={false}
                          displayDataTypes={false}
                          collapsed={2}
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
                      {hasData &&
                          <p>in:</p>
                      }
                      {hasData &&
                          <ReactJson
                              iconStyle="square"
                              theme="rjv-default"
                              name={null}
                              enableClipboard={false}
                              displayObjectSize={false}
                              displayDataTypes={false}
                              collapsed={3}
                              src={data}
                          />
                      }
                  </div>
              }
              {!searchResults.length &&
                  <div className="all-data">
                      {hasData &&
                          <ReactJson
                              iconStyle="square"
                              theme="rjv-default"
                              name={null}
                              enableClipboard={false}
                              displayObjectSize={false}
                              displayDataTypes={false}
                              collapsed={3}
                              src={data}
                          />
                      }
                      {hasAdditionalData &&
                          <ReactJson
                              iconStyle="square"
                              theme="rjv-default"
                              name={null}
                              enableClipboard={false}
                              displayObjectSize={false}
                              displayDataTypes={false}
                              collapsed={3}
                              src={additionalData}
                          />
                      }
                  </div>
              }
          </ModalBody>
        </Modal>
    )
}

export default AnalysisTab
