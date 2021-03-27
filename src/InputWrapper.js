import React from 'react';
import { InputNumber } from 'antd';

class InputWrapper extends React.Component {
  shouldComponentUpdate(np, ns) {
    const { value } = this.props;

    // this prevents any component to render if the value hasn't changed
    // I know per React's official documentation that this is not a guarantee,
    // but in this case I added logs if the render function is triggered and confirmed
    // it didn't execute in either cases
    return np.value !== value;
  }

  onChange = (v) => {
    const { onChange } = this.props;
    onChange(v);
  };

  render() {
    const { range, value, onChange } = this.props;
    const min = range[0];
    const max = range[1];

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <div>
          <InputNumber
            min={min}
            max={max}
            style={{ width: 80 }}
            value={value}
            onChange={(v) => {
              // if onChange from the parent is used directly, the last state
              // when this component is last rendered is used
              onChange(v);

              // if we user this.onChange(),which calls the parent's onChange, the most recent state is used
              // this.onChange(v);
            }}
            size="small"
          />
        </div>
      </div>
    );
  }
}

export default InputWrapper;
