import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { VictoryBar, VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryLabel } from 'victory-native'
import { ButtonGroup } from 'react-native-elements'

const LineGraph = (props) => {
    const { data, x, yTitles, yKeys, colors, style } = props;

    const [buttonIndex, setButtonIndex] = useState(0);

    if (!data) {
        return <VictoryBar />;
    }

    let cleanData = data.slice().reverse();

    const buttons = (
        <ButtonGroup
            onPress={r => setButtonIndex(r)}
            selectedIndex={buttonIndex}
            buttons={yTitles}
            containerStyle={{height: 50}}
            selectedButtonStyle={{backgroundColor: '#fcc9c0'}}
            textStyle={{
                fontSize: 20, 
            }}
            selectedTextStyle={{
                fontSize: 20,
                color: '#000000'
            }}
            underlayColor={"#000000"}
        />
    );

    return (
        <>
            <VictoryChart theme={VictoryTheme.material} domainPadding={15}>
                <VictoryAxis fixLabelOverlap={true} />
                <VictoryAxis dependentAxis />
                <VictoryLine
                    style={{
                        data: { stroke: colors[buttonIndex] },
                        parent: { border: "1px solid #ccc"}
                    }}
                    data={cleanData}
                    x={x}
                    y={yKeys[buttonIndex]}
                    key={buttonIndex}
                />
            </VictoryChart>
            {yTitles.length > 1 && buttons}
        </>
    );
};

export default LineGraph;