import React,{Component} from 'react';
import {Modal} from 'react-bootstrap';

import './table.css';
class FashionConsultants extends Component {
    state = {
        consultants:[],
        showModal:false,
        modalFields:{
            operation:'Create',
            consultant:{}
        }
      } 

    componentDidMount(){
        fetch("http://localhost:4000/fashionConsultants")
            .then(response => response.json())
            .then(consultants => {
                console.log(consultants);
                this.setState({consultants});
            });
    }

    handleModal(consultant,operation){
        this.setState({showModal:!this.state.showModal})
        let modalFields = {
            operation, consultant
        }
        this.setState({modalFields});
    }

    handleChange = e => {
        let modalFields = this.state.modalFields;
        modalFields.consultant[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ modalFields });
    };

    handleCreate = e => {
        e.preventDefault();        
        const consultant = this.state.modalFields.consultant;
        const consultants = [consultant , ...this.state.consultants];
        this.setState({consultants});
    }

    handleUpdate = e => {
        e.preventDefault();
        const consultant = this.state.modalFields.consultant;
        const consultants = [...this.state.consultants];
        const index = consultants.indexOf(consultant);
        consultants[index] = {...consultant};
        this.setState({consultants});
    }

    handleDelete = consultant => {
        const consultants = this.state.consultants.filter(c => c.userId !== consultant.userId);
        this.setState({consultants});
    }

    render() { 
        return (
            <div>
                <br/>
                <br /><br/>
                {/* <h4>Add Consultants</h4>
                <br />
                <form onSubmit>
                    <div className="form-group">
                        <input type="text" className="form-control" id="name" placeholder="Enter Name" />
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="text" className="form-control" id="email" placeholder="Enter Email" />
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="text" className="form-control" id="contact" placeholder="Enter Contact" />
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="text" className="form-control" id="city" placeholder="Enter City" />
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="text" className="form-control" id="expertise" placeholder="Enter Expertise" />
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="text" className="form-control" id="workExperience" placeholder="Enter Work Experience" />
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="text" className="form-control" id="rate" placeholder="Enter Rate" />
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="text" className="form-control" id="workSample" placeholder="Enter Work Samples" />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form> */}
                <button type="button" className="btn btn-primary" onClick={() => this.handleModal({}, 'Create')}>Create</button>
                <div class="table-responsive tableDiv">
                <table className="table table-striped table-condensed">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">User Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">City</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Email</th>
                        <th scope="col">Expertise</th>
                        <th scope="col">Rate</th>
                        <th scope="col">User Image</th>
                        <th scope="col">Work Experience</th>
                        <th scope="col">Work Sample</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.consultants.map(consultant => 
                            <tr key={consultant.userId}>
                                <th scope="row">{consultant.userId}</th>
                                <td>{consultant.name}</td>
                                <td>{consultant.city}</td>
                                <td>{consultant.contact}</td>
                                <td>{consultant.email}</td>
                                <td>{consultant.expertise}</td>
                                <td>{consultant.rate}</td>
                                <td>{consultant.userImage}</td>
                                <td>{consultant.workExperience}</td>
                                <td>{consultant.workSample}</td>
                                <td><button type="button" className="btn btn-sm btn-warning" onClick={() => this.handleModal(consultant, 'Update')}>Update</button></td>
                                <td><i class="fa fa-trash-o fa-2x" style={{color:'crimson', cursor:'pointer'}} onClick={() => this.handleDelete(consultant)}></i></td>
                            </tr> 
                        )}
                        <tr>
                                <th scope="row">consultant.userId</th>
                                <td>consultant.namnewnrwnfn</td>
                                <td>consultant.city</td>
                                <td>consultant.contact</td>
                                <td>consultant.email</td>
                                <td>consultant.expertise</td>
                                <td>consultant.rate</td>
                                <td>consultant.userImage</td>
                                <td>consultant.workExperience</td>
                                <td>consultant.workSample</td>
                                <td> <button type="button" className="btn btn-sm btn-warning">Update</button></td>
                            <td><i class="fa fa-trash-o fa-2x" style={{color:'crimson'}}></i></td>
                        </tr> 
                        <tr>
                            <th scope="row">consultant.userId</th>
                            <td>consultant.namnewnrwnfn</td>
                            <td>consultant.city</td>
                            <td>consultant.contact</td>
                            <td>consultant.email</td>
                            <td>consultant.expertise</td>
                            <td>consultant.rate</td>
                            <td>consultant.userImage</td>
                            <td>consultant.workExperience</td>
                            <td>consultant.workSample</td>
                            <td> <button type="button" className="btn btn-sm btn-warning">Update</button></td>
                            <td><i class="fa fa-trash-o fa-2x" style={{color:'crimson'}}></i></td>
                        </tr> 
                        <tr>
                            <th scope="row">consultant.userId</th>
                            <td>consultant.namnewnrwnfn</td>
                            <td>consultant.city</td>
                            <td>consultant.contact</td>
                            <td>consultant.email</td>
                            <td>consultant.expertise</td>
                            <td>consultant.rate</td>
                            <td>consultant.userImage</td>
                            <td>consultant.workExperience</td>
                            <td>consultant.workSample</td>
                            <td><button type="button" className="btn btn-sm btn-warning">Update</button></td>
                            <td><i class="fa fa-trash-o fa-2x" style={{color:'crimson'}}></i></td>
                        </tr> 
                    </tbody>
                </table>
                </div>
                <Modal show={this.state.showModal}>
                    <Modal.Header>{this.state.modalFields.operation} Entry</Modal.Header>
                    <Modal.Body>
                        <form  onSubmit={this.state.modalFields.operation === 'Update' ? this.handleUpdate : this.handleCreate}>
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" defaultValue={this.state.modalFields.consultant.name} name="name" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter Name" />
                            </div>
                            <br />
                            <div style={{float:"right"}}>
                            <span><button type="submit" className="btn btn-primary">Submit</button></span>&nbsp;&nbsp;&nbsp;
                            <span><button type="button" className="btn btn-primary" onClick={() => this.setState({showModal:false})}>Close</button></span>
                            </div>
                    </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
 
export default FashionConsultants;