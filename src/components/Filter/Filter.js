import React from 'react';
import styleFilter from "./Filter.module.css";

const Filter = ({value, contactsFilter}) => {
  return (
    <div className={styleFilter.filterWrap}>
      <h3 className={styleFilter.filterTitle}>Find by name</h3>
       <input
          type="text"
          className={styleFilter["filter_input"]}
          value={value}
          onChange={contactsFilter}
        ></input>
    </div>
  );
};

export default Filter;
