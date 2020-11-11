import React, { useState } from 'react'
import { View } from 'react-native'
import { VictoryChart, VictoryScatter, VictoryTheme, VictoryAxis } from 'victory-native'
import { ButtonGroup } from 'react-native-elements'

const ScatterPlot = ( props ) => {

    let data = props.data;
    let x = props.x;
    let yTitles = props.titles;
    let yKeys = props.keys;
    let colors = props.colors;

    const [buttonIndices, setButtonIndices] = useState([0]);

    if (!data) {
        return <VictoryScatter />;
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
                <VictoryScatter
                  style={{
                    data: { fill : colors[index] },
                    parent: { border : "1px solid #ccc"}

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

export default ScatterPlot;