import React, { useState, useContext } from "react";

const dataTypes = [
  "bit",
  "int",
  "float",
  "Date",
  "Time",
  "Datetime",
  "Timestamp",
  "Year",
  "Char",
  "Varchar",
  "Varchar()",
  "bit",
  "Binary",
];

function Fields(props) {
  const { updateRow, row } = props;
  const [name, setName] = useState(row.name);
  const [data_type, setdata_type] = useState(row.data_type);
  const [null_value, setnull_value] = useState(row.null_value);
  const [primary, setprimary] = useState(row.primary);
  const [reload, setreload] = useState('')
 
  React.useEffect(()=>{
       if(primary){
           setnull_value(false)
       }
  },[null_value])
  React.useEffect(() => {
    if (primary) {
      setnull_value(false);
    }
  }, [primary]);

  const submitR = () => {
    var newR = {
      id: row.id,
      name: name,
      data_type: data_type,
      null_value: null_value,
      primary: primary,
    };
    updateRow(newR);
  };
  return (
    <React.Fragment>
      <td>{row.id}</td>
      <td>
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          placeholder="row name"
        />
      </td>
      <td>
        {" "}
        <select
          onChange={(e) => {
            setdata_type(e.target.value);
          }}
          value={data_type}
        >
          {dataTypes.map((t, index) => (
            <option key={index}>{t}</option>
          ))}
        </select>{" "}
      </td>
      <td>
        {" "}
        <input
        defaultChecked={primary}
          type="checkbox"
          value={primary}
          onChange={() => setprimary(!primary)}
        />{" "}
      </td>
      <td>
        <input
        checked={null_value}
          onChange={() => {
            setnull_value(!null_value);
          }}
          value={null_value}
          type="checkbox"
        />
      </td>
      <td>
        <button onClick={submitR} className="btn btn-primary m-2">
          add
        </button>
      </td>
    </React.Fragment>
  );
}

export default Fields;
