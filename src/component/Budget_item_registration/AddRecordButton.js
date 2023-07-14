import { Button } from "@mui/material";
import { Component } from "react";
import AddIcon from "@mui/icons-material/Add";


class AddRecordButton extends Component {

    handleClick = (props) => {
        const id = this.props.randomId();
        const newRow = { id, name: "New Record", age: 0, joinDate: new Date(), role: "Market", isNew: true };

        this.setState(prevState => ({
            rows: [...prevState.rows, newRow],
            rowModesModel: {
                ...prevState.rowModesModel,
                [id]: { mode: this.props.GridRowModes.Edit, fieldToFocus: "name" },
            }
        }));
    };

    render() {
        return (
            <Button color="secondary" startIcon={<AddIcon />} onClick={this.handleClick}>
                Add recorddddddd
            </Button>)

    }
}
export default AddRecordButton;