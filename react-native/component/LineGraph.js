import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { VictoryBar, VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryLabel } from 'victory-native'
import { ButtonGroup } from 'react-native-elements'

const LineGraph = (props) => {
    const { data, x, yTitles, yKeys, colors, style } = props;

    const [buttonIndices, setButtonIndices] = useState([0]);

    if (!data) {
        return <VictoryBar />;
    }

    let cleanData = data.slice().reverse();
    const plots = buttonIndices.map(index => {
        return (
            <VictoryLine
                style={{
                    data: { stroke: colors[index] },
                    parent: { border: "1px solid #ccc"}
                }}
                data={cleanData}
                x={x}
                y={yKeys[index]}
                key={index}
            />
        );
    });

    const buttons = (
        <ButtonGroup
            onPress={r => setButtonIndices(r)}
            selectedIndexes={buttonIndices}
            buttons={yTitles}
            containerStyle={{height: 50}}
            selectMultiple={true}
            underlayColor={"#000000"}
        />
    );

    return (
        <View style={style}>
            <VictoryChart theme={VictoryTheme.material}>
                <VictoryLabel text="Local COVID Cases" textAnchor="middle" x={200} y={30} style={[{fontSize: 24}]}/>
                <VictoryAxis fixLabelOverlap={true} />
                {plots}
            </VictoryChart>
            {yTitles.length > 1 && buttons}
        </View>
    );
}

export default LineGraph;