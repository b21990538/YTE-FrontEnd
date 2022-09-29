import React, {useEffect} from 'react';
import Plotly from "plotly.js-dist";

function HistogramDrawer({data}) {

    useEffect(()=> {
        drawHistogram();
    }, []);

    function drawHistogram() {
        let trace = {
            x: data,
            type: 'histogram',
            xbins: {
                end: 100,
                size: 5,
                start: 0
            },
            marker: {
                color: "rgba(255, 150, 0, 0.8)",
                line: {
                    color:  "rgba(255, 150, 0, 1)",
                    width: 1
                }
            },
        };
        const layout = {
            plot_bgcolor:"#555",
            paper_bgcolor:"#555"
        }
        let histData = [trace];
        Plotly.newPlot('grade-histogram', histData, layout);
    }

    return <div id={"grade-histogram"}/>;
}

export default HistogramDrawer;