
const MainMenu = ({updater}) => {

    return (
        <div className="main-menu" >
            <h1 style={{paddingTop:'5%', fontSize:'50px'}}>Invoice Generator</h1>
            <div className="main-select">

                <div className="btn" onClick={() => updater('new-invoice')}
                    style={{ fontSize: '30px', width: '50%'}}>New Invoice</div>

                <div className="btn" onClick={() => updater('history')}
                    style={{ fontSize: '30px', width: '50%' }}>History</div>

                <div className="btn" onClick={() => updater('clients')}
                    style={{ fontSize: '30px', width: '50%' }}>Clients</div>

            </div>
        </div>
    )
}

export default MainMenu
