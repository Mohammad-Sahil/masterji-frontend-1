import React,{Component} from 'react';
import {Modal} from 'react-bootstrap';
import SearchBar from './searchBar';
import './table.css';
class Fabric extends Component {
    state = {
        consultants:[],
        showModal:false,
        modalFields:{
            operation:'Create',
            consultant:{}
        },
        searchText:""
      } 

    componentDidMount(){
        fetch("http://localhost:4000/Fabric")
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

    search = searchText => {
        console.log(searchText);
        this.setState({searchText});
    }

    render() { 
        const {consultants, searchText} = this.state;
        let filteredConsultants = consultants;
        filteredConsultants = filteredConsultants.filter(consultant => {
            for(let property in consultant){
                if(consultant[property].includes(searchText)) return true;
            }
            return false;
        })
        return (
            <div className="container">
                <br/>
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
                <div className="row">
                    <div className="col-1">
                        <button type="button" className="btn btn-primary addButton" style={{width:80}} onClick={() => this.handleModal({}, 'Create')}>Add</button>
                    </div>
                    <div className="col-11">
                        <SearchBar search={this.search} searchInput={searchText} />
                    </div>
                </div>
                <br />
                <div class="table-responsive tableDiv">
                <table className="table table-striped table-condensed">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">Created At</th>
                        <th scope="col">User Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Shop Name</th>
                        <th scope="col">Contact</th>
                        <th scope="col">City</th>
                        <th scope="col">Address</th>
                        <th scope="col">Shop Variety</th>
                        <th scope="col">Specialization</th>
                        <th scope="col">Fabric Sample</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredConsultants.map(consultant => 
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
                                <td><button className="btn-warning editButton"><i class="fa fa-pencil"  aria-hidden="true"  onClick={() => this.handleModal(consultant, 'Update')}></i></button></td>
                                <td><button className="btn-danger deleteButton"><i class="fa fa-trash-o" onClick={() => this.handleDelete(consultant)}></i></button></td>
                            </tr> 
                        )}
                        {/* <tr>
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
                                <td><i class="fa fa-pencil-square-o fa-2x" style={{color:'gold', cursor:'pointer'}} aria-hidden="true" ></i></td>

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
                            <td><i class="fa fa-pencil-square-o fa-2x" style={{color:'gold', cursor:'pointer'}} aria-hidden="true" ></i></td>
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
                            <td><i class="fa fa-pencil-square-o fa-2x" style={{color:'gold', cursor:'pointer'}} aria-hidden="true" ></i></td>
                            <td><i class="fa fa-trash-o fa-2x" style={{color:'crimson'}}></i></td>
                        </tr>  */}
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
                            <span><button type="submit" className="btn btn-primary">Submit</button></span>
                            <span><button type="button" className="btn btn-primary" onClick={() => this.setState({showModal:false})}>Close</button></span>
                            </div>
                    </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
 
export default Fabric;