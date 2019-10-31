import React from 'react'
import Modal from "react-bootstrap4-modal";
import axios from "axios";

class FeedbackCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title:'',
            description:'',
            rating: 10,
            email:'',
            modalIsOpen: false,
            errors:[]
        }

        this.openModal = this.openModal.bind(this);
        this.createFeedback = this.createFeedback.bind(this);
        this.closeModal = this.closeModal.bind(this);


        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    componentDidMount () {

       setTimeout(()=>{
           this.setState({
              modalIsOpen:true
           });
       },200)

    }


    closeModal() {
        this.setState({modalIsOpen: false});
    }


    openModal() {
        this.setState({modalIsOpen: true});
    }


    handleFieldChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
              <strong>{this.state.errors[field][0]}</strong>
            </span>
            )
        }
    }


    createFeedback(event) {
        event.preventDefault()

        const feedback = {
            title:this.state.title,
            description:this.state.description,
            rating:this.state.rating,
            email:this.state.email,

        }


        axios.post('/feedback', feedback)
            .then(response => {
                this.closeModal()

                this.setState({
                    title: '',
                    description: '',
                    rating:10,
                    email:''

                });

            })
            .catch(error => {
                this.closeModal()
                console.log(error);
                this.setState({
                    errors: error.response.data.errors
                })
            })
    }


    hasErrorFor (field) {
        return !!this.state.errors[field]
    }


    render() {
        return (
            <div className='col-6 mx-auto'>
                <Modal visible={this.state.modalIsOpen} onClickBackdrop={this.closeModal}>
                    <div className="modal-header">
                        <h5 className="modal-title">Tell us about your experience !</h5>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={this.createFeedback}>
                            <div className='form-group'>
                                <label htmlFor='email'>Email</label>
                                <input
                                    id='email'
                                    type='email'
                                    className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                                    name='email'
                                    value={this.state.email}
                                    onChange={this.handleFieldChange}
                                    required
                                />
                                {this.renderErrorFor('email')}
                            </div>
                            <div className='form-group'>
                                <label htmlFor='title'>Title </label>
                                <input
                                    id='title'
                                    type='text'
                                    className={`form-control ${this.hasErrorFor('title') ? 'is-invalid' : ''}`}
                                    name='title'
                                    value={this.state.title}
                                    onChange={this.handleFieldChange}
                                    required
                                />
                                {this.renderErrorFor('title')}
                            </div>

                            <div className='form-group'>
                                <label htmlFor='description'>Message</label>
                                <textarea
                                    id='description'
                                    className={`form-control ${this.hasErrorFor('description') ? 'is-invalid' : ''}`}
                                    name='description'
                                    rows='10'
                                    value={this.state.description}
                                    onChange={this.handleFieldChange}
                                    required
                                />
                                {this.renderErrorFor('description')}
                            </div>

                            <div className='form-group'>
                                <label htmlFor='rating'>Rating</label>
                                <input
                                    id='rating'
                                    type='number'
                                    max='10'
                                    className={`form-control ${this.hasErrorFor('rating') ? 'is-invalid' : ''}`}
                                    name='rating'
                                    value={this.state.rating}
                                    onChange={this.handleFieldChange}
                                    required
                                />
                                {this.renderErrorFor('rating')}
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={this.closeModal}>
                                    Close
                                </button>
                                <button type="submit" className="btn btn-primary" >
                                    Send
                                </button>

                            </div>
                        </form>

                    </div>

                </Modal>

            </div>
        );
    }
}

export default FeedbackCard;
