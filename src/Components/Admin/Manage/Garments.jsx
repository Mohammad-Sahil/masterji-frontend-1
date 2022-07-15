import React,{Component} from 'react';
import {Modal} from 'react-bootstrap';
import SearchBar from './searchBar';
import './table.css';

class Garment extends Component {
    state = {
        garments:[],
        showModal:false,
        modalFields:{
            operation:'Create',
            garment:{}
        },
        searchText:""
      } 

    componentDidMount(){
        fetch("http://localhost:4000/Garment")
            .then(response => response.json())
            .then(garments => {
                console.log(garments);
                this.setState({garments});
            });
    }

    handleModal(garment,operation){
        this.setState({showModal:!this.state.showModal})
        let modalFields = {
            operation, garment
        }
        this.setState({modalFields});
    }

    handleChange = e => {
        let modalFields = this.state.modalFields;
        modalFields.garment[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ modalFields });
    };

    handleCreate = e => {
        e.preventDefault();        
        const garment = this.state.modalFields.garment;
        const garments = [garment , ...this.state.garments];
        this.setState({garments});
    }

    handleUpdate = e => {
        e.preventDefault();
        const garment = this.state.modalFields.garment;
        const garments = [...this.state.garments];
        const index = garments.indexOf(garment);
        garments[index] = {...garment};
        this.setState({garments});
    }

    handleDelete = garment => {
        const garments = this.state.garments.filter(c => c.userId !== garment.userId);
        this.setState({garments});
    }

    search = searchText => {
        console.log(searchText);
        this.setState({searchText});
    }

    render() { 
        const {garments, searchText} = this.state;
        let filteredgarments = garments;
        filteredgarments = filteredgarments.filter(garment => {
            for(let property in garment){
                if(garment[property].includes(searchText)) return true;
            }
            return false;
        })
        return (
            <div>
                <br/>
                {/* <h4>Add garments</h4>
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
                        <th scope="col">City</th>
                        <th scope="col">Category</th>
                        <th scope="col">Garment Details</th>
                        <th scope="col">Stiching Category</th>
                        <th scope="col">Garment Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredgarments.map(garment => 
                            <tr key={garment.userId}>
                                <th scope="row">{garment.userId}</th>
                                <td>{garment.name}</td>
                                <td>{garment.city}</td>
                                <td>{garment.contact}</td>
                                <td>{garment.email}</td>
                                <td>{garment.expertise}</td>
                                <td>{garment.rate}</td>
                                <td>{garment.userImage}</td>
                                <td>{garment.workExperience}</td>
                                <td>{garment.workSample}</td>
                                <td><button className="btn-warning editButton"><i class="fa fa-pencil"  aria-hidden="true"  onClick={() => this.handleModal(garment, 'Update')}></i></button></td>
                                <td><button className="btn-danger deleteButton"><i class="fa fa-trash-o" onClick={() => this.handleDelete(garment)}></i></button></td>
                            </tr> 
                        )}
                        {/* <tr>
                                <th scope="row">garment.userId</th>
                                <td>garment.namnewnrwnfn</td>
                                <td>garment.city</td>
                                <td>garment.contact</td>
                                <td>garment.email</td>
                                <td>garment.expertise</td>
                                <td>garment.rate</td>
                                <td>garment.userImage</td>
                                <td>garment.workExperience</td>
                                <td>garment.workSample</td>
                                <td><i class="fa fa-pencil-square-o fa-2x" style={{color:'gold', cursor:'pointer'}} aria-hidden="true" ></i></td>

                            <td><i class="fa fa-trash-o fa-2x" style={{color:'crimson'}}></i></td>
                        </tr> 
                        <tr>
                            <th scope="row">garment.userId</th>
                            <td>garment.namnewnrwnfn</td>
                            <td>garment.city</td>
                            <td>garment.contact</td>
                            <td>garment.email</td>
                            <td>garment.expertise</td>
                            <td>garment.rate</td>
                            <td>garment.userImage</td>
                            <td>garment.workExperience</td>
                            <td>garment.workSample</td>
                            <td><i class="fa fa-pencil-square-o fa-2x" style={{color:'gold', cursor:'pointer'}} aria-hidden="true" ></i></td>
                            <td><i class="fa fa-trash-o fa-2x" style={{color:'crimson'}}></i></td>
                        </tr> 
                        <tr>
                            <th scope="row">garment.userId</th>
                            <td>garment.namnewnrwnfn</td>
                            <td>garment.city</td>
                            <td>garment.contact</td>
                            <td>garment.email</td>
                            <td>garment.expertise</td>
                            <td>garment.rate</td>
                            <td>garment.userImage</td>
                            <td>garment.workExperience</td>
                            <td>garment.workSample</td>
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
                                <input type="text" defaultValue={this.state.modalFields.garment.name} name="name" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter Name" />
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
 
export default Garment;