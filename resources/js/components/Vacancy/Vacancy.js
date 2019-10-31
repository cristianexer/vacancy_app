import axios from 'axios'
import React, { Component } from 'react'
import VacancyCard from "./VacancyCard";
import Modal from 'react-bootstrap4-modal';
import FeedbackCard from "../partials/FeedbackCard";


class Vacancy extends Component {
    constructor () {
        super()
        this.state = {
            vacancies: [],
            modalIsOpen: false,
            title:'',
            description:'',
            location:'',
            min_salary:'',
            max_salary:'',
            errors: [],
            first_page_url: '',
            from: 0,
            last_page: 0,
            last_page_url: '',
            next_page_url: '',
            path: '',
            per_page: 0,
            current_page:1,
            prev_page_url: null,
            to: 0,
            total: 0,
            q:'',
            feedback:false,
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);


        this.createVacancy = this.createVacancy.bind(this);
        this.searchVacancy = this.searchVacancy.bind(this);

        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }
    handleFieldChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    createVacancy(event) {
        event.preventDefault()

        const vacancy = {
            title:this.state.title,
            description:this.state.description,
            location:this.state.location,
            min_salary:this.state.min_salary,
            max_salary:this.state.max_salary

        }


        axios.post('/vacancies', vacancy)
            .then(response => {
               this.loadVacancies()
                this.closeModal()

                this.setState({
                    title: '',
                    description: '',
                    location: '',
                    min_salary: '',
                    max_salary: ''

                });

               setTimeout(()=>{
                   this.setState({
                       feedback:true
                   })
               },1000)

            })
            .catch(error => {
                this.closeModal()

                this.setState({
                    errors: error.response.data.errors
                })
            })
    }


    hasErrorFor (field) {
        return !!this.state.errors[field]
    }

    changePage(pageNumber) {
        this.setState({ current_page: pageNumber }, () => {this.loadVacancies()});
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

    pagesNumbers() {
        let pagesArray = [];
        for (let page = 1; page <= this.state.last_page; page++) {
            pagesArray.push(page);
        }
        return pagesArray;
    }

    pageList() {
        return this.pagesNumbers().map(page => {
            return <li className={ page === this.state.current_page ? 'page-item active' : 'page-item' } key={page}>
                <button className="page-link" onClick={() => this.changePage(page)}>{page}</button>
            </li>
        })
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    searchVacancy(event){
        event.preventDefault();

        this.loadVacancies()
    }



    loadVacancies(){
        axios.get(`/vacancies?page=${this.state.current_page}&q=${this.state.q}`).then(response => {
            this.setState({
                vacancies: response.data.data,
                vacanciesCount: response.data.total,
                first_page_url: response.data.first_page_url,
                from: response.data.from,
                last_page: response.data.last_page,
                last_page_url: response.data.last_page_url,
                next_page_url: response.data.next_page_url,
                path: response.data.path,
                per_page: response.data.per_page,
                current_page:response.data.current_page,
                prev_page_url: response.data.prev_page_url,
                to: response.data.to,
                total: response.data.total,
            });

        })
    }
    componentDidMount () {

        this.loadVacancies()

    }



    render () {
        const { vacancies } = this.state
        return (
            <div className='container mt-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <h3 className='font-weight-light border-bottom pb-3'>Filter Vacancies</h3>
                        <form onSubmit={this.searchVacancy}>
                            <div className='form-group'>
                                <label htmlFor='q'>Keywords </label>
                            <input
                                id='q'
                                type='text'
                                className={`form-control ${this.hasErrorFor('q') ? 'is-invalid' : ''}`}
                                name='q'
                                value={this.state.q}
                                placeholder='Job Title, Keywords'
                                onChange={this.handleFieldChange}
                            />
                            {this.renderErrorFor('q')}
                            </div>
                            <div className='form-group'>
                            <button type='submit' className='btn btn-primary btn-block'>Filter Results</button>
                            </div>
                        </form>
                    </div>

                    <div className='col-md-9'>
                        <div className="alert alert-secondary border-0">
                            <div className='row'>

                                <div className='col-md-9'>
                                    <h5 className='lh-2 font-weight-light'>Available Vacancies ({this.state.total})</h5>
                                </div>

                                <div className='col-md-3'>
                                    <button className='btn btn-add-vacancy btn-block' onClick={this.openModal}>Add New Vacancy</button>
                                    <Modal visible={this.state.modalIsOpen} onClickBackdrop={this.closeModal}>
                                        <div className="modal-header">
                                            <h5 className="modal-title">Add New Vacancy</h5>
                                        </div>
                                        <div className="modal-body">
                                           <form onSubmit={this.createVacancy}>
                                               <div className='form-group'>
                                                   <label htmlFor='title'>Vacancy Title </label>
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
                                                   <label htmlFor='location'>Location</label>
                                                   <input
                                                       id='location'
                                                       type='text'
                                                       className={`form-control ${this.hasErrorFor('location') ? 'is-invalid' : ''}`}
                                                       name='location'
                                                       value={this.state.location}
                                                       onChange={this.handleFieldChange}
                                                       required
                                                   />
                                                   {this.renderErrorFor('location')}
                                               </div>

                                               <div className='form-row mb-3'>
                                                   <div className='col'>
                                                       <label htmlFor='min_salary'>Minimum Salary</label>
                                                       <input
                                                           id='min_salary'
                                                           type='number'
                                                           className={`form-control ${this.hasErrorFor('min_salary') ? 'is-invalid' : ''}`}
                                                           name='min_salary'
                                                           value={this.state.min_salary}
                                                           onChange={this.handleFieldChange}
                                                           required
                                                       />
                                                       {this.renderErrorFor('min_salary')}
                                                   </div>
                                                   <div className='col'>
                                                       <label htmlFor='max_salary'>Maximum Salary</label>
                                                       <input
                                                           id='max_salary'
                                                           type='number'
                                                           className={`form-control ${this.hasErrorFor('max_salary') ? 'is-invalid' : ''}`}
                                                           name='max_salary'
                                                           value={this.state.max_salary}
                                                           onChange={this.handleFieldChange}
                                                           required
                                                       />
                                                       {this.renderErrorFor('max_salary')}
                                                   </div>

                                               </div>
                                               <div className='form-group'>
                                                   <label htmlFor='description'>Description</label>
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
                                               <div className="modal-footer">
                                                   <button type="button" className="btn btn-secondary" onClick={this.closeModal}>
                                                       Close
                                                   </button>
                                                   <button type="submit" className="btn btn-primary" >
                                                       Create
                                                   </button>

                                               </div>
                                           </form>

                                        </div>

                                    </Modal>
                                </div>
                            </div>
                        </div>


                        {this.state.vacancies.length < 1 ? (
                            <div className='col-12'>
                                <h5 className='text-center'>Ops! We do not have any vacancy available.</h5>
                            </div>
                        ) : (
                            <>
                            {vacancies.map(vacancy => (
                                    <VacancyCard vacancy={vacancy} key={vacancy.id}/>

                                ))}

                                <div className='col-12'>
                                    <div className='row'>
                                        <nav>
                                            <ul className="pagination">
                                                <li className="page-item">
                                                    <button className="page-link"
                                                            disabled={ 1 === this.state.current_page }
                                                            onClick={() => this.changePage(this.state.current_page - 1)}
                                                    >
                                                        <i className="fas fa-chevron-left"></i>
                                                    </button>
                                                </li>
                                                { this.pageList() }
                                                <li className="page-item">
                                                    <button className="page-link"
                                                            disabled={this.state.last_page === this.state.current_page}
                                                            onClick={() => this.changePage(this.state.current_page + 1)}
                                                    >
                                                        <i className="fas fa-chevron-right"></i>
                                                    </button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </>


                        )}




                    </div>


                    {this.state.feedback ? (
                        <FeedbackCard />
                    ): (
                        <></>
                    )}


                </div>
            </div>
        )
    }
}

export default Vacancy
