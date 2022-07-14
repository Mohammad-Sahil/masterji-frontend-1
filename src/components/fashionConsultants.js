import React,{Component} from 'react';

class FashionConsultants extends Component {
    state = {
        consultants:[]
      } 

    componentDidMount(){
        fetch("http://localhost:4000/fashionConsultants")
            .then(response => response.json())
            .then(consultants => {
                console.log(consultants);
                this.setState({consultants});
            });
    }

    render() { 
        return (
            <div>
                <br/>
                <h2>Consultants</h2>
                <br /><br/>
                <h4>Add Consultants</h4>
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
                </form>
                <br/><br/>
                <table className="table">
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
                            </tr> 
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}
 
export default FashionConsultants;