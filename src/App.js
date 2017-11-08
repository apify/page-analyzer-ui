import React, { Component } from 'react';
import jump from 'jump.js';
import { startRun, getOutput } from './lib/api';
import './App.css';

import Header from './components/Header';
import InputForm from './components/InputForm';
import AnalysisResults from './components/AnalysisResults';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            searchFor: {},
            run: '',
            keystore: '',
            queryingOutput: false,
            currentOutputLoadedAt: null,
        };
        this.startAnalysis = this.startAnalysis.bind(this)
        this.queryOutput = this.queryOutput.bind(this)
    }
    async startAnalysis(INPUT) {
        this.setState(INPUT)
        const response = await startRun(INPUT);
        this.setState({
            runId: response.data.id,
            keystore: response.data.defaultKeyValueStoreId,
            queryingOutput: true,
            outputResponse: null
        });
        this.queryOutput(response.data.defaultKeyValueStoreId);
    }
    async queryOutput(keystore) {
        let response
        try {
            response = await getOutput(keystore);
            if (!this.state.outputResponse) jump('.results-section', { offset: -60 });
        } catch (error) {
            if (!error.status || error.status !== 404) throw error;
            response = {
                analysisStarted: true,
                analysisEnded: false,
            }
        }
        let lastOutputChange = this.state.currentOutputLoadedAt
        if (JSON.stringify(response) !== JSON.stringify(this.state.outputResponse)) {
            lastOutputChange = new Date()
            this.setState({
                outputResponse: response,
                currentOutputLoadedAt: lastOutputChange,
            });
        } else {
            const outputChangeDiff = lastOutputChange - new Date()
            if (outputChangeDiff > 15000) {
                response.analysisEnded = true;
                this.setState({
                    outputResponse: response,
                });
            }
        }
        if (!response.analysisEnded) window.setTimeout(() => this.queryOutput(keystore), 500);
    }
    render() {
        return (
            <div className="App">
                <Header />
                <section>
                    <InputForm onSubmit={this.startAnalysis}/>
                </section>
                <section className="results-section">
                    <AnalysisResults response={this.state.outputResponse}/>
                </section>
            </div>
        );
    }
}

export default App;
