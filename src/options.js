import React from "react";
function Options(props) {
    return (
        <>
            <div class="form-group">
                <label htmlFor="option">Option {props.property}:</label>
                <input type="text" class="form-control col-2" name="option" />
            </div>
            <div class="checkbox">
                <label><input type="checkbox" name="isCorrect" /> Is correct</label>
            </div>
            <div class="form-group">
                <label htmlFor="point">Point</label>
                <input type="text" class="form-control col-2" name="point" />
            </div>
            
        </>
    );
}
export default Options;