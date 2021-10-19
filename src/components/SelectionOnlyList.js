import FilteredMultiSelect from "react-filtered-multiselect";
import {Button} from "react-bootstrap";
import {useState} from "react";

export default function SelectionOnlyList(props) {

    const [state, setState] = useState({selectedOptions: props.currentRoleState}); // {id: props.currentRoleState.id, name: props.currentRoleState.name}
    const [options] = useState(props.rolesState);

    const DEFAULT_STYLE_MULTISELECT = {
        filter: 'form-control',
        select: 'form-control',
        button: 'btn btn btn-block btn-default',
        buttonActive: 'btn btn btn-block btn-primary text-white bg-success border-success'
    };

    function SelectionChanged(selectedOptions) {
        // For multi selection
        //selectedOptions.sort((a, b) => a.id - b.id)

        // For only one selection
        if (selectedOptions.length > 1) {
            selectedOptions.splice(0, 1);
        }

        setState({selectedOptions})
        props.onChange(selectedOptions);

    }

    function Deselection(index) {
        var newSelectedOptions = state.selectedOptions.slice();
        newSelectedOptions.splice(index, 1);
        setState({newSelectedOptions});
    }

    function ClearSelection(e) {
        setState({selectedOptions: []});
        props.onChange([]);
    }

    return (<div>
                <div><FilteredMultiSelect classNames={DEFAULT_STYLE_MULTISELECT} onChange={SelectionChanged} options={options} selectedOptions={state.selectedOptions} textProp={"name"} valueProp={"id"} showFilter={false} /></div>
                <p className={"help_block"}>Set the role to AppUser</p>
                <div className={"col-md-100"}> {state.selectedOptions.length === 0 && <p>(no role selected yet)</p> }
                    {state.selectedOptions.length > 0 && <ol>
                        {state.selectedOptions.map((item, i) => <li key={item.id}>
                            {`${item.name}`}
                            <span style={{cursor: 'pointer'}} onClick={()=>Deselection(i)}>&nbsp;&nbsp;&times;</span>
                        </li>)}
                    </ol>}
                    {state.selectedOptions.length > 0 && <Button variant={"info"} style={{marginLeft: 20}} className="text-white btn btn-default" onClick={ClearSelection}>
                        Clear Selection
                    </Button>}
                </div>
            </div>
);


}