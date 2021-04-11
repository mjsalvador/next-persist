import { Component } from 'react';
import { connect } from 'react-redux';
import { writeStorage } from './next-persist';

const mapStateToProps = (state) => ({
  state,
});

class NextPersistWrapper extends Component {
  render() {
    if (this.props.wrapperConfig.combinedReducers) {
      const { allowedKeys } = this.props.wrapperConfig;
      const { allowedReducers } = this.props.wrapperConfig;

      allowedReducers.forEach((allowedReducer, index) => {
        const nextPersistConfig = {
          key: allowedKeys[index],
        };
        writeStorage(nextPersistConfig, this.props.state[allowedReducer]);
      });
    } else {
      const nextPersistConfig = {
        key: this.props.wrapperConfig.key,
        allowList: this.props.wrapperConfig.allowList,
      };
      writeStorage(nextPersistConfig, this.props.state);
    }

    return this.props.children;
  }
}

const PersistWrapper = connect(mapStateToProps)(NextPersistWrapper);

export default PersistWrapper;