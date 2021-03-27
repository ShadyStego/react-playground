import React from 'react';
import InputWrapper from './InputWrapper';
import _ from 'lodash';
import 'antd/dist/antd.css';

class App extends React.Component {
  state = {
    metricValues: [
      {
        metric: 'METRIC_A',
        value: 50,
        someOtherAttribute1: true,
        someOtherAttribute2: 'boo',
      },
      {
        metric: 'METRIC_B',
        value: 10,
        someOtherAttribute1: true,
        someOtherAttribute2: 'bla',
      },
    ],
  };
  minMaxRanges = {
    METRIC_A: [0, 100000],
    METRIC_B: [0, 1000000],
  };
  render() {
    const { metricValues } = this.state;

    const inputFilters = ['METRIC_A', 'METRIC_B'].map((m) => {
      const mv = metricValues.find((f) => f.metric === m);

      const onChange = (value) => {
        const newMetricValueFilters = _.cloneDeep(metricValues);
        const mvCopy = newMetricValueFilters.find((f) => f.metric === m);
        mvCopy.value = value;
        this.setState({ metricValues: newMetricValueFilters });
      };

      const props = {
        range: this.minMaxRanges[m],
        value: mv.value,
        onChange,
      };

      return (
        <div style={{ margin: 12, display: 'flex' }} key={m}>
          <div style={{ marginRight: 12 }}>{m}</div>
          <InputWrapper {...props} />
        </div>
      );
    });

    return <div className="App">{inputFilters}</div>;
  }
}

export default App;
