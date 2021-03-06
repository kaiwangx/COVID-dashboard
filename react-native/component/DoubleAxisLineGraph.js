import React from 'react'
import { VictoryChart, VictoryAxis, VictoryLine, VictoryLabel, VictoryGroup, VictoryLegend } from 'victory-native'

export default function DALineGraph(props){
    const { data } = props;
    // code based on
    // https://formidable.com/open-source/victory/gallery/multiple-dependent-axes/

    // find maxima for normalizing data
    const maxima = data.map(
        (dataset) => Math.max(...dataset.map((d) => d.y))
    );

    const xOffsets = [50, 335];
    const tickPadding = [ 0, -15 ];
    const anchors = ["end", "start"];
    const colors = ["red", "gray"];

    const xticks = (xtick) => {
        if (xtick == data[0][0].x || xtick == data[0][data[0].length - 1].x) {
            return xtick;
        }
        return "";
    };
    return (
        <VictoryChart
            width={385} height={400} domain={{ y: [0, 1] }}
        >
            <VictoryAxis tickFormat={xticks} />
                {data.map((d, i) => (
                    <VictoryAxis dependentAxis
                        key={i}
                        offsetX={xOffsets[i]}
                        style={{
                            axis: { stroke: colors[i] },
                            ticks: { padding: tickPadding[i] },
                            tickLabels: { fill: colors[i], textAnchor: anchors[i] }
                        }}
                        // Use normalized tickValues (0 - 1)
                        tickValues={[0, 0.25, 0.5, 0.75, 1]}
                        // Re-scale ticks by multiplying by correct maxima
                        tickFormat={(t) => (t * maxima[i] / 1000).toPrecision(3) + "k"}
                    />
                ))}
                <VictoryGroup offset={22} colorScale={colors}>
                    {data.map((d, i) => (
                        <VictoryLine
                            key={i}
                            data={d}
                            // normalize data
                            y={(datum) => datum.y / maxima[i]}
                        />
                    ))}
                </VictoryGroup>
            <VictoryLegend x={220} colorScale={["red", "gray"]} 
                data={[{name: "+ Test Cases"}, {name: "- Test Cases"}]}/>
        </VictoryChart>
    );
}
