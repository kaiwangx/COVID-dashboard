import React, { useState } from 'react'
import { View } from 'react-native'
import { VictoryChart, VictoryScatter, VictoryTheme, VictoryAxis, VictoryLabel } from 'victory-native'
import { ButtonGroup } from 'react-native-elements'
import { InfoCard } from './InfoCard'

const ScatterPlot = (props) => {
    const {data, x, yTitles, yKeys, colors, style} = props;

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
            containerStyle={{height: 50}}
            selectMultiple={true}
            underlayColor={"#000000"}
        />
    );

    return (
        <InfoCard title={"State COVID Cases"}>
            <VictoryChart theme={VictoryTheme.material} domainPadding={15}>
                <VictoryLabel text="State COVID Cases" textAnchor="middle" x={200} y={30} style={[{fontSize: 24}]}/>
                <VictoryAxis fixLabelOverlap={true}/>
                <VictoryAxis dependentAxis />
                {plots}
            </VictoryChart>
            {yTitles.length > 1 && buttons}
        </InfoCard>
    );
};

export default ScatterPlot;