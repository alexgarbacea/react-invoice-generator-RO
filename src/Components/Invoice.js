import React, { useRef, useState } from "react";
import { useReactToPrint } from 'react-to-print';
//https://www.npmjs.com/package/react-to-print

const ComponentToPrint = React.forwardRef(({ data, nota }, ref) => {

    const frmt = new Intl.NumberFormat('en-US');

    let d = new Date(data.invoiceDate); 

    const getTotal = () => {
        let total = 0;
        data.items.map(item => total += (parseFloat(item.val) + parseFloat(item.tva)))
        return frmt.format(total)
    }

    const getPartial = (tva) => {
        let total = 0
        if(!tva){
            data.items.map(item => total += parseFloat(item.val))
            return frmt.format(total)
        }
        else{
            data.items.map(item => total += parseFloat(item.tva))
            return frmt.format(total)
        }
    }

    return(
        <div className="print-bg" ref={ref}>
            <div className="page a4">
                <div className="page-padding">
                    <div className="page-row">
                        {data.companyLogo && 
                        <img className="img-invoice" src={data.companyLogo} alt="company logo"/>
                        }

                        <div className="invoice-top-data">
                            <h1>FACTURĂ</h1>
                            <table className="table-item-preview table-invoice-top">
                                <tbody>
                                    <tr>
                                        <th>Serie</th>
                                        <th>Număr</th>
                                        <th>Dată</th>
                                    </tr>
                                    <tr>
                                        <td>{data.invoiceSeries}</td>
                                        <td>{data.invoiceNr}</td>
                                        <td>
                                            {`${d.getDate()}/${("0" + d.getMonth()).slice(-2)}/${d.getFullYear()}`}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="page-row company-table">
                        <div className="company-table-inside" style={{ borderRight:'2px solid #ddd'}}>
                            <div>Furnizor:</div>
                            <div>{data.companyName}</div>
                            <div>CIF: {data.companyCIF}</div>
                            <div>Reg. com.: {data.companyRegCom}</div>
                            <div>Adresă: {data.companyAdresa}</div>
                            <div>Telefon: {data.companyTelefon}</div>
                            <div>Cont: {data.companyCont}</div>
                            <div>Bancă: {data.companyBank}</div>
                            <div>Cap. social: {data.companyCapSocial}</div>
                            {data.companyTVA > 0 && 
                            <>
                                <div>Cotă TVA: {data.companyTVA}% - {data.companyTVApay && 'TVA la încasare'}</div>
                            </>
                            }
                        </div>
                        <div className="company-table-inside" style={{marginLeft:'10px'}}>
                            <div>Client:</div>
                            <div>{data.clientName}</div>
                            <div>CIF: {data.clientCIF}</div>
                            <div>Reg. com.: {data.clientRegCom}</div>
                            <div>Adresă: {data.clientAdresa}</div>
                            <div>Cont: {data.clientCont}</div>
                            <div>Bancă: {data.clientBank}</div>
                        </div>
                    </div>

                    <table className="table-item-preview table-invoice-services">
                        <tbody>
                            <tr>
                                <th>Nr. crt</th>
                                <th>Denumirea produselor sau a serviciilor</th>
                                <th>U.M.</th>
                                <th>Cantitate</th>
                                <th>Preț unitar</th>
                                <th>Valoare lei</th>
                                {data.companyTVA > 0 && <th>Valoare TVA</th>}
                            </tr>
                            {data.items.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.um}</td>
                                        <td>{frmt.format(parseFloat(item.qt))}</td>
                                        <td>{frmt.format(parseFloat(item.unitPrice))}</td>
                                        <td>{frmt.format(parseFloat(item.val))}</td>
                                        {data.companyTVA > 0 && <td>{frmt.format(parseFloat(item.tva))}</td>}
                                    </tr>
                                )
                            })}
                            <tr style={{ borderTop:'4px solid #ddd'}}>
                                <td colSpan={1} rowSpan={2} style={{backgroundColor:'white'}} >
                                    <div style={{ textAlign: 'right'}}>
                                        <div>Delegat:</div>
                                        <div>CNP:</div>
                                        <div>C.I.:</div>
                                        <div>Transport:</div>
                                    </div>
                                </td>
                                <td colSpan={3} rowSpan={2} style={{ backgroundColor: 'white', verticalAlign:'top' }}>
                                    <div style={{ textAlign: 'left'}}>
                                        <div>{data.delName}</div>
                                        <div>{data.delCNP}</div>
                                        <div>{data.delSeries}</div>
                                        <div>{data.transport}</div>
                                    </div>
                                </td>
                                <td colSpan={1} rowSpan={2}>TOTAL:</td>
                                {data.companyTVA > 0 && <>
                                <td>{getPartial(false)}</td>
                                <td>{getPartial(true)}</td></>}
                            </tr>
                            <tr>
                                <td colSpan={data.companyTVA > 0 ? 2 : 1}>{getTotal()} lei</td>
                            </tr>
                            <tr>
                                <td colSpan={4} style={{paddingBottom:'20%', backgroundColor:'white'}}>
                                    Semnătură și ștampilă furnizor
                                </td>
                                <td colSpan={3} style={{ paddingBottom: '20%', backgroundColor: 'white' }}>
                                    Semnătură de primire
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style={{textAlign:'center'}}>
                        Termen de plată: {data.invoiceTerm} zile de la emiterea facturii.
                    </div>
                    {nota && <div style={{ textAlign: 'center' , marginTop:'20px'}}>
                        <small >
                            Notă: Potrivit art. 319, alin. 29 din Legea nr.227/2015 privind Codul fiscal,<br />
                            <span style={{fontStyle:'italic'}}>
                                "semnarea si stampilarea facturilor nu constituie elemente obligatorii pe care trebuie sa le contina factura".
                            </span>
                        </small>
                    </div>}
                </div>
            </div>
        </div>
    )
})


const Invoice = ({ data, updater }) => {

    const defaultColor = '#2991F7';

    const [nota, setNota] = useState(true);
    const [hideMenu, setHideMenu] = useState(false);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const bgColor = (e) => {
        document.documentElement.style.setProperty('--table-bg', e);
    }

    const txtColor = e => {
        document.documentElement.style.setProperty('--table-text', e);
    }

    const resetValues = () => {
        document.documentElement.style.setProperty('--table-bg', defaultColor);
        document.documentElement.style.setProperty('--table-text', '#ffffff');
        setNota(true);
    }

    return (
        <div>
            <ComponentToPrint ref={componentRef} data={data} nota={nota} />
            <span title="close" onClick={() => updater('main')}
                className="btn btn-close-hide btn-left"
                >X
            </span>
            <span title="save"
                style={{ position: 'fixed', bottom: '1%', right: '10px',}} 
                className="btn btn-right" 
                onClick={handlePrint}>Save
            </span>
            {hideMenu &&
            <div className="invoice-menu">
                
                <div onClick={() => setNota(!nota)} style={{cursor:'pointer', userSelect:'none'}}>
                    Notă subsol: <input style={{cursor:'pointer'}} type='checkbox' checked={nota} readOnly />
                </div>
                <div>
                    <label>Background: </label>
                    <input type='color' defaultValue={defaultColor} onChange={(e) => bgColor(e.target.value)} />
                </div>
                <div>
                    <label>Text: </label>
                    <input type='color' defaultValue={'#ffffff'} onChange={(e) => txtColor(e.target.value)} />
                </div>
                <div style={{ textAlign: 'center', textDecoration: 'underline' }}>
                    <small style={{cursor:'pointer'}} onClick={resetValues}>Reset values</small>
                </div>
                <small style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => setHideMenu(false)}
                    title="close options">
                    close
                </small>
            </div>}
            {!hideMenu &&
            <div className="invoice-menu" style={{cursor:'pointer'}} 
            onClick={() => setHideMenu(true)}
            title="options">
                ⚙️
            </div>
            }
        </div>
    );
}

export default Invoice
