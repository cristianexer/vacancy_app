import React from 'react'

class VacancyCard extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div className='col-12 my-3 border rounded py-3 vacancy-card'>
                <div className='col-12'>
                    <div className='col-12 my-3'>
                        <h5>{this.props.vacancy.title}</h5>
                    </div>
                    <div className='col-12 my-3 vacancy-card-body'>
                        <div className='row'>
                            <div className='col-3'>
                                <i className="fas fa-map-marker-alt"></i>
                                {this.props.vacancy.location}
                            </div>

                            <div className='col-4'>
                                <i className="fas fa-pound-sign"></i>
                                {this.props.vacancy.min_salary} - {this.props.vacancy.max_salary}
                            </div>

                        </div>
                    </div>
                    <div className='col-12 my-3'>
                        {this.props.vacancy.description}
                    </div>
                    <div className='col-12 my-3'>
                        <button className='btn btn-secondary mr-3'>More Details</button>
                        <button className='btn btn-primary'>Apply</button>
                    </div>
                </div>

            </div>
        );
    }
}

export default VacancyCard;
