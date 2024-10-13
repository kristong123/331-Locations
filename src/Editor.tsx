import React, { Component } from 'react';
import { Location, Marker, COLORS } from './marker';
import { BUILDINGS } from './buildings';

type EditorProps = {
  /** The marker that the user wants to edit. */
  marker: Marker;

  /** If provided, let the user move to this location. */
  moveTo?: Location; // Note: not needed until task 3

  /** Callback to invoke when the user wants to cancel editing. */
  onCancelClick: () => void;

  /** Calback to invoke when the user wants to save the edit. */
  onSaveClick: (name: string, color: string, loc: Location) => void;
};

type EditorState = {
  name: string;
  color: string;
  moveLocation: string;
  filter: string;
  clickLocation: boolean;
};


/** Component that allows the user to edit a marker. */
export class Editor extends Component<EditorProps, EditorState> {
  constructor(props: EditorProps) {
    super(props);

    this.state = {
      name: props.marker.name,
      color: props.marker.color,
      moveLocation: "",
      filter: "",
      clickLocation: false
    };
  }

  componentDidUpdate = (oldProps: EditorProps, _oldState: EditorState): void => {
    // If the App changed our props (so we are now editing a new Marker), then
    // we should update our state to show its name and color instead.
    if (oldProps !== this.props) {
      this.setState({name: this.props.marker.name, color: this.props.marker.color});
    }
  };

  render = (): JSX.Element => {
    const filteredBuildings = BUILDINGS.filter(building =>
      building.longName.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    const newLocation = this.props.moveTo 
      || filteredBuildings.find(building => building.longName === this.state.moveLocation)?.location
      || this.props.marker.location;

    return <div>
        <p>
          Name: <input
            type="text"
            value={this.state.name}
            readOnly
          />
        </p>
        <p>
          Color: <select 
            value={this.state.color}
            onChange={(e) => this.setState({color: e.target.value})}
          >
            {COLORS.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </p>
        <label>
          <input 
            type="checkbox"
            checked={this.state.clickLocation}
            onChange={(e) => this.setState({clickLocation: e.target.checked})}
          /> move to new location (gray)
        </label>
        {!this.state.clickLocation && <p>
          Move To: <select
            value={this.state.moveLocation}
            onChange={(e) => this.setState({moveLocation: e.target.value})}>
            <option>Select a location</option>
            {filteredBuildings.map((building) => (
              <option key={building.longName} value={building.longName}>
                {building.longName}
              </option>
            ))}
          </select>
        </p>}
        {!this.state.clickLocation && <p>
          Filter: <input
            type="text"
            value={this.state.filter}
            onChange={(e) => this.setState({filter: e.target.value})}
          />
        </p>}
        <button onClick={() => this.props.onSaveClick(
          this.state.name,
          this.state.color, 
          newLocation
        )}>Save</button>
        <button onClick={this.props.onCancelClick}>Cancel</button>
    </div>;
  };

}