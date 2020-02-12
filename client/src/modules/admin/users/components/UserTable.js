import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter'
import paginationFactory from 'react-bootstrap-table2-paginator'

import {getAllUser} from '../UserApi'

class UserTable extends React.Component{

    state = {
        users:[
        ],
        columns:[
            {
                dataField:'id',
                text:"ID"
            },
            {
                dataField:'user',
                text:"USER NAME",
                filter: textFilter(),
                sort:true
            },
            {
                dataField:"email",
                text:"EMAIL",
                sort:true
            },
            {
                dataField:'action',
                isDummyField:true,
                text:"Action",
                formatter: (cellContent, row) =>{
                    var self = this;
                    function onDel(row){
                        if(window.confirm('really want to del "'+row.user+'"?')){
                            var index = self.state.users.findIndex( i=> i.user === row.user);
                            var newState = self.state.users.splice(index,1);
                            self.setState(newState);
                            console.log("del account here:" + index);
                            
                        }
                    }
                    function onChangePassword(row){
                        let newPassword = window.prompt('New password for "'+row.user+'"?');
                        console.log("update new pass here:" + newPassword);
                    }
                    return (
                        <div>
                            <button type="button" className ='btn btn-danger' onClick={()=>{onDel(row)}}>Del</button>
                            <button type="button" className ='btn btn-warning' onClick={()=>{onChangePassword(row)}}>Password</button>
                        </div>
                    )
                }
            }
        ]
    }
    componentDidMount(){
        getAllUser(0,10).then((response)=>{
            this.setState({
                users:response.data
            })
            console.log("response:"+ JSON.stringify(response))
        })
    }
    render(){
        return (
            <BootstrapTable
                striped
                hover
                condensed
                keyField='id'
                data={this.state.users}
                columns={this.state.columns}
                filter={filterFactory()}
                pagination={paginationFactory()}
                defaultSorted={[{dataField:'user',order:'desc'}]}
            ></BootstrapTable>
        )
    }
}

export default UserTable