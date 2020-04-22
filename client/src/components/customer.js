import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export default class Customer extends React.Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return(

                <TableRow>
                    <TableCell>
                        {this.props.id}
                    </TableCell>
                    <TableCell>
                       <img src={this.props.image} alt="profile"/>
                    </TableCell>

                    <TableCell>
                         {this.props.name}
                    </TableCell>

                    <TableCell>
                        {this.props.gender}
                    </TableCell>

                    <TableCell>
                        {this.props.address}
                    </TableCell>
                </TableRow>

        );
    };
} 