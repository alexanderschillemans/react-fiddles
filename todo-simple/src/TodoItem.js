import React from 'react';
import M from 'materialize-css';

const aStyle = {
    cursor: 'pointer'
}

export class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleUncomplete = this.handleUncomplete.bind(this);
    this.toggleState = this.toggleState.bind(this);

    this.state = { value: this.props.item.name, isEditing: false };
  }

  // =======[LIFECYCLE METHODS]=======

  componentDidMount() {
    // Initialize all the tooltips at the beginning

    if (!this.state.isEditing && !this.props.item.isCompleted) {
      this.initTooltips();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    
    // If changed from complete to uncomplete: initalize tooltips again
    if (prevProps.item.isCompleted && !this.props.item.isCompleted) {
      this.initTooltips();
    } else if (!prevProps.item.isCompleted && this.props.item.isCompleted) {
      this.destroyTooltips();
    }

    // Destroy tooltips in edit mode, initialize again in normal mode
    if (prevState.isEditing && !this.state.isEditing) {
      this.initTooltips();
    } else if (!prevState.isEditing && this.state.isEditing) {
      this.destroyTooltips();
    }

  }

  // =======[RENDERING]=======
  renderForm() {
    return <div className="card" id={"card-" + this.props.item.id}>
        <div className="card-content">
          <form>
            <div className="input-field">
              <input type="text" defaultValue={this.state.value} onChange={this.handleChange} />
            </div>
          </form>
        </div>
        <div className="card-action">
          <a href="#!" className="waves-effect waves-light btn" onClick={this.handleUpdate}>
            <i className="material-icons right">check</i>
            Update
          </a>
        </div>
      </div>;
  }

  renderCompletedItem() {
    return <div className="card" id={"card-" + this.props.item.id}>
        <div className="card-content">
          <span className="card-title strikethrough">
            {this.state.value}
          </span>
        </div>
        <div className="card-action valign-center">
          <a href="#!" className="teal-text text-lighten-3" onClick={this.handleUncomplete}>
            Not Completed
          </a>
        </div>
      </div>;
  }

  renderItem() {
    return <div className="card" id={"card-" + this.props.item.id}>
        <div className="card-content">
          <span className="card-title">{this.state.value}</span>
        </div>
        <div className="card-action valign-center">
          <a href="#!" className="teal-text text-lighten-3 tooltipped" data-position="top" data-tooltip="Edit" style={aStyle} onClick={this.toggleState}>
            <li className="material-icons">create</li>
          </a>
          <a href="#!" className="teal-text text-lighten-3 tooltipped" data-position="top" data-tooltip="Delete" style={aStyle} onClick={this.handleDelete}>
            <li className="material-icons">delete</li>
          </a>
          <a href="#!" className="waves-effect waves-light btn valign-center" onClick={this.handleComplete}>
            <li className="material-icons right">check</li>
            Complete
          </a>
        </div>
      </div>;
  }

  render() {
      
      // Render form if editing task
      // Otherwise, if task is completed: render completed task. (striked through, no edit or delete)
      // Otherwise, render normal task. (normal, can edit or delete)
    if (this.state.isEditing) {
      return this.renderForm();
    } else {
      if (this.props.item.isCompleted) {
        return this.renderCompletedItem();
      } else {
        return this.renderItem();
      }
    }
  }

  // =======[HANDLERS]=======

  handleComplete() {
    this.props.change('COMPLETE', this.props.item.id);
  }

  handleUncomplete() {
    this.props.change('UNCOMPLETE', this.props.item.id);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleDelete() {
    this.props.change('REMOVE', this.props.item.id);
  }

  handleUpdate() {
    this.props.change('UPDATE', this.props.item.id, this.state.value);
    this.toggleState();
  }

  toggleState() {
    const isEditing = this.state.isEditing;

    this.setState({ isEditing: !isEditing });
  }

  // =======[HELPERS]=======

  initTooltips() {
    const selector = "#card-" + this.props.item.id + " .tooltipped";
    let elems = document.querySelectorAll(selector);

    this.tooltipInstance = M.Tooltip.init(elems);
  }

  destroyTooltips() {
    this.tooltipInstance.map(element => {
      return element.destroy();
    });
  }
}