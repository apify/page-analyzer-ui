import React, { Component } from 'react';
import jump from 'jump.js';
import { startRun, getRun, getOutput } from './lib/api';
import './App.css';

// import Header from './components/Header';
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
            error: null,
        };
        this.startAnalysis = this.startAnalysis.bind(this);
        this.queryRun = this.queryRun.bind(this);
        this.queryOutput = this.queryOutput.bind(this);
    }
    async startAnalysis(INPUT) {
        this.setState(INPUT)
        let response;
        try {
            response = await startRun(INPUT);
            if (response.code && response.code > 400) throw response;

            this.setState({
                runId: response.data.id,
                keystore: response.data.defaultKeyValueStoreId,
                queryingOutput: false,
                queryingRun: true,
                outputResponse: null,
                error: null,
            }, () => {
                this.queryRun(response.data.id);
            });
        } catch (error) {
            const errorMessage = error.body && error.body.error;
            if (errorMessage.type && errorMessage.type === 'acts-memory-limit-exceeded') {
                this.setState({
                    queryingOutput: false,
                    queryingRun: false,
                    error: 'Too many users are using analyzer at the same time, please try it again later.',
                })
            } else {
                this.setState({
                    queryingOutput: false,
                    queryingRun: false,
                    error: 'The analyzer did not start properly. Please try it again later.',
                })
            }
        }
    }
    async queryRun() {
        const alreadyQueryingOutput = this.state.queryingOutput;
        try {
            let response = await getRun(this.state.runId);
            if (response.code && response.code > 400) throw response;
            response = response.data;
            this.setState({
                queryingOutput: alreadyQueryingOutput || response.status === 'RUNNING',
                queryingRun: response.status === 'RUNNING',
                error: null,
            }, () => {
                if (response.status === 'RUNNING') window.setTimeout(() => this.queryRun(), 500);
                if (response.status === 'RUNNING' && !alreadyQueryingOutput) this.queryOutput(this.state.keystore);
            });
        } catch (error) {
            this.setState({
                queryingOutput: false,
                queryingRun: false,
                outputResponse: null,
                error: 'The analyzer failed to analyze the provided url. Please try it again later.',
            });
        }
    }
    async queryOutput(keystore) {
        if (!this.state.queryingOutput) return;
        let response
        try {
            response = await getOutput(keystore);
            if (response.code && response.code > 400) throw response;

            if (!this.state.outputResponse) jump('.results-section', { offset: -80 });
        } catch (error) {
            if (error.code !== 404) {
                this.setState({
                    queryingOutput: false,
                    error: 'The analyzer failed to analyze the provided url. Please try it again later.',
                });
                return;
            } else {
                response = this.state.outputResponse || {
                    analysisStarted: true,
                    analysisEnded: false,
                };
            }
        }
        let lastOutputChange = this.state.currentOutputLoadedAt;
        const outputChanged = JSON.stringify(response) !== JSON.stringify(this.state.outputResponse);
        const timedOut = !outputChanged && ((new Date() - lastOutputChange) > 15000);
        if (timedOut || !this.state.queryingRun) response.analysisEnded = true;
        this.setState({
            outputResponse: response,
            currentOutputLoadedAt: outputChanged ? new Date() : lastOutputChange,
            queryingOutput: response.analysisEnded,
        });
        if (!response.analysisEnded) window.setTimeout(() => this.queryOutput(keystore), 500);
    }
    componentDidCatch(error) {
        this.setState({
            queryingOutput: false,
            queryingRun: false,
            error: 'The analyzer failed to analyze the provided url. Please try it again later.',
        });
    }
    render() {
        return (
            <div className="App" id="app">
                {/* <Header /> */}
                <section>
                    <InputForm onSubmit={this.startAnalysis}/>
                </section>
                {this.state.error
                    ? (
                        <section className="error-section">
                            <p>{this.state.error}</p>
                        </section>
                    )
                    : (
                        <section className="results-section">
                            <AnalysisResults
                                response={this.state.outputResponse}
                                searchFor={this.state.searchFor}
                                url={this.state.url}
                            />
                        </section>
                    )
                }
            </div>
        );
    }
}

export default App;
