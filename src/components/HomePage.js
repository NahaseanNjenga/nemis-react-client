import React from 'react'


class HomePage extends React.Component{

    render(){
        return(
            <div className="container">
                <form>
                    <div className="input-group col-sm-6 offset-sm-3 centered">
                        <input type="text" className="form-control" placeholder="Search Student UPI" aria-label="Search Student UPI" aria-describedby="basic-addon1" autoFocus="true"/>
                        <span className="input-group-addon" id="basic-addon1"><i className="fa fa-search"></i></span>
                    </div>
                </form>
            </div>
        )
    }
}

export default HomePage