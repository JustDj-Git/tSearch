import {observer} from "mobx-react";
import React from "react";
import PropTypes from "prop-types";
import getLogger from "../tools/getLogger";

const logger = getLogger('ElementSelector');

@observer
class ElementSelector extends React.Component {
  static propTypes = null && {
    onSelectElement: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.activeSelect = null;
  }

  state = {
    showAddDialog: false,
    snapshot: null,
    inputError: null,
  };

  componentWillUnmount() {
    this.fireActiveSelect();
  }

  get store() {
    return this.props.store;
  }

  get selectorStore() {
    return this.props.store[this.props.id];
  }

  input = null;
  refInput = element => {
    this.input = element;
  };

  handleChange = e => {
    this.selectorStore.set('selector', this.input.value);
  };

  fireActiveSelect() {
    if (this.activeSelect) {
      this.activeSelect();
      this.activeSelect = null;
    }
  }

  optionalCheckbox = null;
  refOptionalCheckbox = element => {
    this.optionalCheckbox = element;
  };

  handleOptionalChange = e => {
    if (this.optionalCheckbox.checked) {
      if (!this.selectorStore) {
        const snapshot = this.state.snapshot && JSON.parse(this.state.snapshot);
        this.store.set(this.props.id, snapshot || {
          selector: this.input.value
        });
      }
    } else {
      if (this.selectorStore) {
        this.state.snapshot = JSON.stringify(this.selectorStore);
        this.store.set(this.props.id, undefined);
        this.fireActiveSelect();
      }
    }
  };

  handleSelect = e => {
    e.preventDefault();
    this.props.onSelectElement(true, this.selectListener, this.handleSelectElement);

    this.activeSelect = () => {
      this.props.onSelectElement();
    };
  };

  selectListener = (path) => {
    this.input.value = path;
    this.handleChange();
  };

  handleSelectElement = (path) => {
    this.props.onSelectElement();

    this.input.value = path;
    this.handleChange();
  };

  updateResult() {
    if (this.state.inputError) {
      this.setState({
        inputError: null
      });
    }

    try {
      const node = this.props.onResolvePath(this.selectorStore.selector);
      if (!node) {
        throw new Error('Node is not found');
      }
    } catch (err) {
      logger('updateResult error', err);

      this.setState({
        inputError: err.message
      });
    }
  }

  render() {
    const {id, children, optional} = this.props;

    const type = this.props.type;
    const isDisabled = !this.selectorStore;
    let title = null;
    if (optional) {
      title = (
        <label className="field-name">
          <input ref={this.refOptionalCheckbox} defaultChecked={!isDisabled} onChange={this.handleOptionalChange} type="checkbox" data-id={`${id}-optional`}/>
          <span>{this.props.title}</span>
        </label>
      );
    } else {
      title = (
        <label className="field-name">{this.props.title}</label>
      );
    }

    let defaultValue = null;
    if (this.selectorStore) {
      defaultValue = this.selectorStore.selector;
    }

    let inputClassList = [];
    if (this.state.inputError) {
      inputClassList.push('error');
    }

    return (
      <div className="field">
        {title}
        <input disabled={isDisabled} type={type} defaultValue={defaultValue} data-id={id} ref={this.refInput} onChange={this.handleChange} className={inputClassList.join(' ')}/>
        {children}
        <input disabled={isDisabled} onClick={this.handleSelect} type="button" data-id={`${id}-btn`} value={chrome.i18n.getMessage('kitSelect')}/>
      </div>
    )
  }
}

export default ElementSelector;