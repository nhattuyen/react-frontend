import {useState} from "react";
import FilteredMultiSelect from "react-filtered-multiselect";

export default function MultiSelectionList(props) {

    const [selectedOptions, setSelectedOptions] = useState(props.selectedOpts);
    const [options] = useState(props.opts);

    const DEFAULT_STYLE_MULTISELECT = {
        filter: 'form-control',
        select: 'form-control',
        button: 'btn btn btn-block btn-default',
        buttonActive: 'btn btn btn-block btn-primary text-white bg-success border-success'
    };

    const STANDARD_STYLE_MULTISELECT = {
      filter: 'form-control',
      select: 'form-control',
      button: 'btn btn btn-block btn-default',
      buttonActive: 'btn btn btn-block btn-danger'
    };

    function handleSelectionChanged(selectedOptions) {
        selectedOptions.sort((a, b) => a.id - b.id)
        setSelectedOptions(selectedOptions);
        props.onChange(selectedOptions);
    }

    function handleDeselected(deselectedOptions) {
        var newSelectedOptions = selectedOptions.slice();

        deselectedOptions.forEach(option => {
           newSelectedOptions.splice(selectedOptions.indexOf(option), 1);
        });
        setSelectedOptions(newSelectedOptions);

        props.onChange(newSelectedOptions);
    }

    return (<div className="row">
        <p>Add the Permission to Role</p>
        <div className="col-md-5">
            <FilteredMultiSelect buttonText="Add" classNames={DEFAULT_STYLE_MULTISELECT} onChange={handleSelectionChanged} options={options} selectedOptions={selectedOptions} textProp="name" valueProp="id" showFilter={false} />
        </div>
        <p>Current Active Permissions</p>
        <div className="col-md-5">
            <FilteredMultiSelect buttonText="Remove" classNames={STANDARD_STYLE_MULTISELECT} onChange={handleDeselected} options={selectedOptions} textProp="name" valueProp="id" showFilter={false} />
        </div>
    </div>);
}