import React from 'react'

export default class Tooltip extends React.Component {
    componentDidMount() {
        const { title, placement, containerClass } = this.props;
        let container = document.getElementById('app');
        if (containerClass) {
            container = document.getElementsByClassName(containerClass)[0];
        }
        this.tooltip = new global.Tooltip(this.spanRef, {
            title,
            placement: placement || 'bottom',
            container: container,
            boundariesElement: container,
        });
    }
    render() {
        const { children } = this.props;
        return <span className="tooltipElement"><span ref={ref => { this.spanRef = ref }}>{children}</span></span>;
    }
}
