import React from 'react';

const DataSelector = (props) => {
    return (
        <div>
            <form>
                <select onChange={props.setMonth}>
                <option >Select a month</option>
                {['January','February','March','April','May','June','July','August','September','October'].map((item, index)=>{
                    return <option key={item} value={`2018-${index > 8 ? index+1 : '0'+(index+1)}`}>{item}</option>
                })}
                </select>
            </form>
        </div>
    );
};

export default DataSelector;