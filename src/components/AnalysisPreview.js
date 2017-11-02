import React from 'react'

const AnalysisPreview = ({ heading, done, foundItems, onClick }) => {
    return (
        <div
            className={`analysis-preview ${foundItems ? 'found' : ''} ${done ? 'done' : ''}`}
            onClick={onClick}
        >
            <div className="name">{heading}</div>
            <div className="found-results">Found: <strong>{foundItems}</strong></div>
        </div>
    )
}

export default AnalysisPreview
