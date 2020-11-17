import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { VictoryBar, VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from 'victory-native'
import { ButtonGroup } from 'react-native-elements'

const LineGraph = ( props ) => {

    let data = props.data;
    let x = props.x;
    let yTitles = props.titles;
    let yKeys = props.keys;
    let colors = props.colors;

    const [buttonIndices, setButtonIndices] = useState([0]);

    if (!data) {
        return <VictoryBar />;
    }

    return (
      <View>
        <VictoryChart
          theme={VictoryTheme.material}
          
        >
          <VictoryAxis
            fixLabelOverlap={true}
          />
          {
            buttonIndices.map( index => {
              return(
                <VictoryLine
                  style={{
                    data: { stroke: colors[index] },
                    parent: { border: "1px solid #ccc"}
                  }}
                  data={data}
                  x={x}
                  y={yKeys[index]}
                  key={index}
                />
              )
            })
          }
        </VictoryChart>
        {yTitles.length > 1 &&
          <ButtonGroup
            onPress={r => setButtonIndices(r)}
            selectedIndexes={buttonIndices}
            buttons={yTitles}
            containerStyle={{height: 50}}
            selectMultiple={true}
            underlayColor={"#000000"}
          /> 
        }
        
      </View>
    );
}

export default LineGraph;