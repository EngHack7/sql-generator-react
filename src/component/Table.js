import React,{useState} from 'react'
import Fields from './Fields'


function Table() {
    const emptyRow = {id:Math.floor(Math.random() * 999 )+1,name:"",data_type : "" ,null_value:false,primary:false}
    const [table,setTable] = useState([])
    const [rerendering, setrerendering] = useState('')
    const [tableName, settableName] = useState('Table_name')

    const updateRow  =(row) => {
        const tables = [ ...table]
        var index = tables.findIndex( r => r.id === row.id )
        tables[index] = row
        console.log('index',index,'row',row,'tables',tables);
        setTable(tables)
    }

    const deleteRow = (row) => {
        const tabels = [ ...table]
        const newTable = tabels.filter(r => r.id !== row.id )
        setTable(newTable)
    }

    React.useEffect(()=>{

        var sgr = `create table ${tableName} (`;
        for (let index = 0; index < table.length; index++) {
          sgr +=
            table[index].name + "  " + table[index].data_type+ ' ' ;
            if(table[index].primary){
                sgr +=' PRIMARY KEY ,'
            }else if(table[index].null_value)
           {sgr += 'NOT NULL' + ' ,\n'}else{sgr += ' ,\n'}
        }
        sgr += ");";
        console.log("effect work", sgr);
        


        setrerendering(sgr)
    },[table,tableName])

    return (
        <div>
            <label htmlFor="tn" > enter table name : 
            </label>
            <input name="tn" value={tableName} onChange={(e) => settableName(e.target.value)} />

            <table className="table  table-striped " >
                <thead>
                  <tr>
                  <th scope="row1" >id</th>
                    <th scope="row1" >name</th>
                    <th scope="row1" >data-type</th>
                    <th scope="row1" >primary-key</th>
                    <th scope="row1" >Not Null</th>
                    <th scope="row1" >Actions</th>
                  </tr>
                </thead>
                <tbody>
                   
                   {table.map((row,index) => <tr  key={row.id} ><Fields key={row.id} delete={deleteRow} updateRow={updateRow} row={row} >{row.name}</Fields></tr> )}
                   
                   <tr><td><button className="btn btn-primary" onClick={()=>{setTable([ ...table,emptyRow])}} >new row</button></td></tr>

                </tbody>
            </table>     
            <div style={{height : 'maxContent'}} >
                {rerendering}
            </div>
        </div>
    )
}

export default Table
