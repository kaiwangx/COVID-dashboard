import React, { useState } from 'react'
import { View } from 'react-native'
import { VictoryChart, VictoryScatter, VictoryTheme, VictoryAxis, VictoryLabel } from 'victory-native'
import { ButtonGroup } from 'react-native-elements'

const ScatterPlot = (props) => {
    const {data, x, yTitles, yKeys, colors} = props;

    const [buttonIndices, setButtonIndices] = useState([0]);

    if (!data) {
        return <VictoryScatter />;
    }

    let cleanData = data.slice().reverse();
    const plots = buttonIndices.map(index => {    
        return (
            <VictoryScatter
                style={{
                    data: { fill : colors[index] },
                    parent: { border : "1px solid #ccc"}
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
            containerStyle={{height: 50, backgroundColor: '#fcc9c0', color: "#000"}}
            selectMultiple={false}
            underlayColor={"#000000"}
        />
    );

    return (
        <>
            <VictoryChart theme={VictoryTheme.material} domainPadding={15}>
                <VictoryAxis fixLabelOverlap={true}/>
                <VictoryAxis dependentAxis />
                {plots}
            </VictoryChart>
            {yTitles.length > 1 && buttons}
        </>
    );
};

export default ScatterPlot;