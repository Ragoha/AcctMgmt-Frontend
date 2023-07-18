import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

export default function mUiTest() {
    return (
        <div>
            <TextField label="Email Address"/>
            <TextField label="Password" type="password" />
            <Checkbox value="remember" color="primary"/>
        </div>
    )

};