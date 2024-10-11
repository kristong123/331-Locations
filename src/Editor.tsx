import React, { Component, useRef } from 'react';
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
  // TODO: add more later
};


/** Component that allows the user to edit a marker. */
export class Editor extends Component<EditorProps, EditorState> {
  constructor(props: EditorProps) {
    super(props);

    this.state = {name: props.marker.name, color: props.marker.color};
  }

  componentDidUpdate = (oldProps: EditorProps, _oldState: EditorState): void => {
    // If the App changed our props (so we are now editing a new Marker), then
    // we should update our state to show its name and color instead.
    if (oldProps !== this.props) {
      this.setState({name: this.props.marker.name, color: this.props.marker.color});
    }
  };

  render = (): JSX.Element => {
    const selectColor = useRef<HTMLSelectElement>(null);
    return <div>
        <p>
          Name: <input type="text" value={this.state.name} readOnly/>
        </p>
        <p>
          Move To: <select> 
            {BUILDINGS.map((building) => (
              <option key={building.longName} value={building.longName}>
                {building.longName}
              </option>
            ))}
          </select>
        </p>
        <p>
          Color: <select ref={selectColor}>
            {COLORS.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </p>
        <button onClick={() => this.props.onSaveClick(
          this.state.name,
          selectColor.current!.value, 
          this.props.marker.location
        )}>Save</button>
        <button onClick={this.props.onCancelClick}>Cancel</button>
    </div>;
  };

}