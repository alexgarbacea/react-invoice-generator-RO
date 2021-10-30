import { useState } from "react"
import ProdDisplay from "./ProdDisplay";

const NewInvoice = ({ generateInvoice, updater }) => {
    //form states
    //invoice data
    const [invoiceDate, setInvoiceDate] = useState('');
    const [invoiceTerm, setInvoiceTerm] = useState(15);
    const [invoiceSeries, setInvoiceSeries] = useState('');
    const [invoiceNr, setInvoiceNr] = useState(0);
    //delegat
    const [delName, setDelName] = useState('');
    const [delCNP, setDelCNP] = useState('');
    const [delSeries, setDelSeries] = useState('');
    const [transport, setTransport] = useState('');
    //your company
    const [companyName, setCompanyName] = useState('');
    const [companyCIF, setCompanyCIF] = useState('');
    const [companyRegCom, setCompanyRegCom] = useState('');
    const [companyAdresa, setCompanyAdresa] = useState('');
    const [companyCapSocial, setCompanyCapSocial] = useState(0);
    const [companyCont, setCompanyCont] = useState('');
    const [companyBank, setCompanyBank] = useState('');
    const [companyTelefon, setCompanyTelefon] = useState('');
    const [companyTVA, setCompanyTVA] = useState(19);
    const [companyTVApay, setCompanyTVApay] = useState(true);
    const [companyLogo, setCompanyLogo] = useState('');
    const [companyErrors, setCompanyErrors] = useState([{
        cif: false,
        regCom: false,
        cont: false,
        telefon: false,
    }]);
    //your client
    const [clientName, setClientName] = useState('');
    const [clientCIF, setClientCIF] = useState('');
    const [clientRegCom, setClientRegCom] = useState('');
    const [clientAdresa, setClientAdresa] = useState('');
    const [clientCont, setClientCont] = useState('');
    const [clientBank, setClientBank] = useState('');
    const [clientErrors, setClientErrors] = useState([{
        cif: false,
        regCom: false,
        cont: false,
        telefon: false,
    }]);
    //products/services
    const [prodDescr, setProdDescr] = useState('');
    const [prodUM, setProdUM] = useState('');
    const [prodQty, setProdQty] = useState(1);
    const [prodUnitPrice, setProdUnitPrice] = useState(0);
    const [prodTotal, setProdTotal] = useState(0);
    const [prodTVA, setProdTVA] = useState(0);
    const [items, setItems] = useState([]);
    //load
    const [loading, setLoading] = useState(false);

    //functions
    const updateData = () => {
        setLoading(true);
        setTimeout(() => { 
            const finalData = {
                invoiceDate: invoiceDate,
                invoiceTerm: invoiceTerm,
                invoiceSeries: invoiceSeries,
                invoiceNr: invoiceNr,
                delName: delName,
                delCNP: delCNP,
                delSeries: delSeries,
                transport: transport,
                companyName: companyName,
                companyCIF: companyCIF,
                companyRegCom: companyRegCom,
                companyAdresa: companyAdresa,
                companyCapSocial: companyCapSocial,
                companyCont: companyCont,
                companyBank: companyBank,
                companyTelefon: companyTelefon,
                companyTVA: companyTVA,
                companyTVApay: companyTVApay,
                companyLogo: companyLogo,
                clientName: clientName,
                clientCIF: clientCIF,
                clientRegCom: clientRegCom,
                clientAdresa: clientAdresa,
                clientCont: clientCont,
                clientBank: clientBank,
                items: items
            }
            setLoading(false);
            generateInvoice(finalData);
        }, 3000);
    }

    const updateCompanyTVA = (e) => {
        e >= 0 ? setCompanyTVA(e) : setCompanyTVA(0);
    }

    const updateCompanyLogo = (e) => {
        setCompanyLogo('');
        if(e) setCompanyLogo(URL.createObjectURL(e));
    }

    const checkCIF = e => {
        //check validity of CIF
        let vNr = 753217532;
        let cifNr = parseInt(e.replace('RO', ''));
        let c1 = cifNr % 10;
        cifNr = Math.floor(cifNr / 10);
        let t = 0;
        while (cifNr > 0) {
            t += (cifNr % 10) * (vNr % 10);
            cifNr = Math.floor(cifNr / 10);
            vNr = Math.floor(vNr / 10);
        }
        //modulo 11
        let c2 = t * 10 % 11;
        if (c2 === 10) c2 = 0;
        return (c1 === c2);
    }

    const checkIban = e => {
        const pattern = /^(?:(?:IT|SM)\d{2}[A-Z]\d{22}|CY\d{2}[A-Z]\d{23}|NL\d{2}[A-Z]{4}\d{10}|LV\d{2}[A-Z]{4}\d{13}|(?:BG|BH|GB|IE)\d{2}[A-Z]{4}\d{14}|GI\d{2}[A-Z]{4}\d{15}|RO\d{2}[A-Z]{4}\d{16}|KW\d{2}[A-Z]{4}\d{22}|MT\d{2}[A-Z]{4}\d{23}|NO\d{13}|(?:DK|FI|GL|FO)\d{16}|MK\d{17}|(?:AT|EE|KZ|LU|XK)\d{18}|(?:BA|HR|LI|CH|CR)\d{19}|(?:GE|DE|LT|ME|RS)\d{20}|IL\d{21}|(?:AD|CZ|ES|MD|SA)\d{22}|PT\d{23}|(?:BE|IS)\d{24}|(?:FR|MR|MC)\d{25}|(?:AL|DO|LB|PL)\d{26}|(?:AZ|HU)\d{27}|(?:GR|MU)\d{28})$/i
        return pattern.test(e);
    }

    const checkRegCom = e => {
        const pattern = new RegExp('([J][0-9]{2})/([0-9]{4})/([0-9]{4})');
        return pattern.test(e);
    }

    const updateCompanyCIF = (e, client) => {
        !client ? setCompanyCIF(e) : setClientCIF(e);
        if (e.length === 0) {
            !client ? setCompanyErrors(prev => [{ ...prev, cif: false }]) : 
            setClientErrors(prev => [{ ...prev, cif: false }]);
            return null;
        }
        else if (e.length < 2 || e.length > 10 || !e.includes('RO')){
            !client ? setCompanyErrors(prev => [{ ...prev, cif: true }]) : 
            setClientErrors(prev => [{ ...prev, cif: true }]);
            return null;
        }
        //check validity of CIF
        if (checkCIF(e)){
            !client ? setCompanyErrors(prev => [{ ...prev, cif: false }]) : 
            setClientErrors(prev => [{ ...prev, cif: false }]);
            return null
        }
        !client ? setCompanyErrors(prev => [{ ...prev, cif: true }]) : 
        setClientErrors(prev => [{ ...prev, cif: true }]);
    }

    const updateCompanyRegCom = (e, client) => {
        !client ? setCompanyRegCom(e) : setClientRegCom(e);

        if (e.length === 0){ 
            !client ? setCompanyErrors(prev => [{ ...prev, regCom: false }]) : 
            setClientErrors(prev => [{ ...prev, regCom: false }])
            return null;
        }
        if (e.length < 13){
            !client ? setCompanyErrors(prev => [{ ...prev, regCom: true }]) : 
            setClientErrors(prev => [{ ...prev, regCom: true }])
            return null;
        }
        if (e.length === 13 && checkRegCom(e)){
            !client ? setCompanyErrors(prev => [{ ...prev, regCom: false }]) : 
            setClientErrors(prev => [{ ...prev, regCom: false }])
            return null;
        }
        !client ? setCompanyErrors(prev => [{ ...prev, regCom: true }]) : 
        setClientErrors(prev => [{ ...prev, regCom: true }])
    }

    const updateCompanyCont = (e, client) => {
        !client ? setCompanyCont(e) : setClientCont(e);
        if (e.length === 0){ 
            !client ? setCompanyErrors(prev => [{ ...prev, cont: false }]) : 
            setClientErrors(prev => [{ ...prev, cont: false }])
            return null;
        }
        if (checkIban(e)){
            !client ? setCompanyErrors(prev => [{ ...prev, cont: false }]) : 
            setClientErrors(prev => [{ ...prev, cont: false }])
            return null;
        }
        !client ? setCompanyErrors(prev => [{ ...prev, cont: true }]) : 
        setClientErrors(prev => [{ ...prev, cont: true }])
    }

    const updateProdQty = e => {
        e !== '' ? setProdQty(e) : setProdQty(0);
        setProdTotal((e * prodUnitPrice).toFixed(2));
        const tva = ((companyTVA / 100) * (e * prodUnitPrice));
        setProdTVA(tva.toFixed(2));
    }

    const updateProdUnitPrice = e => {
        e !== '' ? setProdUnitPrice(e) : setProdUnitPrice(0);
        setProdTotal((e * prodQty).toFixed(2));
        const tva = ((companyTVA / 100) * (e * prodQty));
        setProdTVA(tva.toFixed(2));
    }

    const addProd = e => {
        e.preventDefault();
        const item = {
            name: prodDescr,
            um: prodUM,
            qt: prodQty,
            unitPrice: prodUnitPrice,
            val: prodTotal,
            tva: prodTVA
        }

        setItems(prev => [...prev, item])
        
        setProdDescr('');
        setProdUM('');
        setProdQty(0);
        setProdUnitPrice(0);
        setProdTotal(0);
        setProdTVA(0);
    }

    const delProd = i => {
        setItems(items.filter((item, index) => {return index !== i}))
    }

    const saveToLocal = () => {
        const compData = {
            companyName: companyName,
            companyCIF: companyCIF,
            companyRegCom: companyRegCom,
            companyAdresa: companyAdresa,
            companyCapSocial: companyCapSocial,
            companyCont: companyCont,
            companyBank: companyBank,
            companyTelefon: companyTelefon,
            companyTVA: companyTVA,
            companyTVApay: companyTVApay,
            companyLogo: companyLogo
        }
        localStorage.setItem('companyData', JSON.stringify(compData))
    }

    const loadFromLocal = () => {
        if (localStorage.getItem('companyData') !== null){
            const data = JSON.parse(localStorage.getItem('companyData'));

            setCompanyName(data.companyName)
            setCompanyCIF(data.companyCIF)
            setCompanyRegCom(data.companyRegCom)
            setCompanyAdresa(data.companyAdresa)
            setCompanyCapSocial(data.companyCapSocial)
            setCompanyCont(data.companyCont)
            setCompanyBank(data.companyBank)
            setCompanyTelefon(data.companyTelefon)
            setCompanyTVA(data.companyTVA)
            setCompanyTVApay(data.companyTVApay)
            //data.companyLogo && setCompanyLogo(data.companyLogo)
        }
    }

    return (
        <div className="main-menu">
            <h1 style={{ paddingTop: '5%', fontSize: '50px' }}>Factură nouă</h1>
            <div className="main-select">
                <form>
                    <h2>Date factură</h2>
                    <hr />
                    <div className="form-structure">
                        <div className="form-labels">
                            <label>Serie:</label>
                            <label>Număr:</label>
                            <label>Dată:</label>
                            <label>Termen plată:</label>
                        </div>
                        <div className="form-input">
                            <input className="invoice-input" value={invoiceSeries}
                                type='text' onChange={(e) => setInvoiceSeries(e.target.value)} />

                            <input className="invoice-input" value={invoiceNr} min={0}
                                type='number' onChange={(e) => setInvoiceNr(e.target.value)} />

                            <input className="invoice-input" value={invoiceDate}
                                type='date' onChange={(e) => setInvoiceDate(e.target.value)} />

                            <input className="invoice-input" value={invoiceTerm}
                                type='number' placeholder="zile" onChange={(e) => setInvoiceTerm(e.target.value)} />
                        </div>
                    </div>
                    <h3>Delegat</h3>
                    <div className="form-structure">
                        <div className="form-labels">
                            <label>Nume:</label>
                            <label>CNP:</label>
                            <label>Serie CI:</label>
                            <label>Mijloc transport:</label>
                        </div>
                        <div className="form-input">
                            <input className="invoice-input" value={delName}
                                type='text' onChange={(e) => setDelName(e.target.value)} required />
                            <input className="invoice-input" value={delCNP} min={0}
                                type='number' onChange={(e) => setDelCNP(e.target.value)} required />
                            <input className="invoice-input" value={delSeries}
                                type='text' onChange={(e) => setDelSeries(e.target.value)} required />
                            <input className="invoice-input" value={transport}
                                type='text' onChange={(e) => setTransport(e.target.value)} />
                        </div>
                    </div>
                </form>
            </div>
            <div className="main-select">
                <form>
                    <h2>Firmă</h2>
                    <hr/>
                    <div className="form-structure">
                        <div className="form-labels">
                            <label>Nume:</label>
                            <label>CIF:</label>
                            <label>Reg. com.:</label>
                            <label>Adresa:</label>
                            <label>Cap. social:</label>
                            <label>Bancă:</label>
                            <label>Cont:</label>
                            <label>Telefon:</label>
                            <label>Cotă TVA:</label>
                            <label>TVA încasare:</label>
                        </div>
                        <div className="form-input">
                            <input className="invoice-input" value={companyName}
                                type='text' onChange={(e) => setCompanyName(e.target.value)} required />
                            <input className={companyErrors[0].cif ? "invoice-input-error" : "invoice-input"}
                                value={companyCIF}
                                type='text' onChange={(e) => 
                                updateCompanyCIF(e.target.value.toUpperCase(), false)} required />
                            <input className={companyErrors[0].regCom ? "invoice-input-error" : "invoice-input"}
                                value={companyRegCom}
                                type='text' onChange={(e) => 
                                updateCompanyRegCom(e.target.value.toUpperCase(), false)} required />
                            <input className="invoice-input" value={companyAdresa}
                                type='text' onChange={(e) => setCompanyAdresa(e.target.value)} required />
                            <input className="invoice-input" value={companyCapSocial} min={0}
                                type='number' onChange={(e) => setCompanyCapSocial(e.target.value)} />
                            <input className="invoice-input" value={companyBank}
                                type='text' onChange={(e) => setCompanyBank(e.target.value)} />
                            <input className={companyErrors[0].cont ? "invoice-input-error" : "invoice-input"}
                                value={companyCont}
                                type='text' onChange={(e) => updateCompanyCont(e.target.value.toUpperCase(), false)} />
                            <input className="invoice-input" value={companyTelefon} pattern="[0-9]{10}"
                                type='tel' onChange={(e) => setCompanyTelefon(e.target.value)} />
                            <input className="invoice-input" value={companyTVA} min={0}
                                type='number' onChange={(e) => updateCompanyTVA(e.target.value)} required />
                            <select className="invoice-input"
                                value={companyTVApay} onChange={(e) => setCompanyTVApay(e.target.value)}>
                                <option value={true}>DA</option>
                                <option value={false}>NU</option>
                            </select>
                        </div>
                    </div>
                    <input className="invoice-upload-file" accept="image/*"
                        type='file' onChange={(e) => updateCompanyLogo(e.target.files[0])} />
                    <br />
                    <div className="double-btn">
                        <span className="btn" style={{backgroundColor:'green'}} onClick={saveToLocal}>
                            Save
                        </span>
                        {localStorage.getItem('companyData') !== null && 
                            <span className="btn" onClick={loadFromLocal}>Load</span>
                        }
                    </div>
                </form>
            </div>
            {companyLogo &&
                <div className="main-select">
                    <label>Logo preview:</label>
                    <img className="img-preview" src={companyLogo} alt="company logo" />
                    <small title="delete" style={{color:'red', cursor:'pointer', textDecoration:'underline'}}
                    onClick={() => setCompanyLogo('')}>
                        Delete
                    </small>
                </div>
            }

            <div className="main-select">
                <form>
                    <h2>Client</h2>
                    <hr />
                    <div className="form-structure">
                        <div className="form-labels">
                            <label>Nume:</label>
                            <label>CIF:</label>
                            <label>Reg. com.:</label>
                            <label>Adresa:</label>
                            <label>Bancă:</label>
                            <label>Cont:</label>
                        </div>
                        <div className="form-input">
                            <input className="invoice-input" value={clientName}
                                type='text' onChange={(e) => setClientName(e.target.value)} required />
                            <input className={clientErrors[0].cif ? "invoice-input-error" : "invoice-input"}
                                value={clientCIF}
                                type='text' onChange={(e) => 
                                updateCompanyCIF(e.target.value.toUpperCase(), true)} required />
                            <input className={clientErrors[0].regCom ? "invoice-input-error" : "invoice-input"}
                                value={clientRegCom}
                                type='text' onChange={(e) => 
                                updateCompanyRegCom(e.target.value.toUpperCase(), true)} required />
                            <input className="invoice-input" value={clientAdresa}
                                type='text' onChange={(e) => setClientAdresa(e.target.value)} required />
                            <input className="invoice-input" value={clientBank}
                                type='text' onChange={(e) => setClientBank(e.target.value)} />
                            <input className={clientErrors[0].cont ? "invoice-input-error" : "invoice-input"}
                                value={clientCont}
                                type='text' onChange={(e) => updateCompanyCont(e.target.value.toUpperCase(), true)} />
                        </div>
                    </div>
                </form>
            </div>

            <div className="main-select">
                <form onSubmit={addProd}>
                    <h2>Produse / Servicii</h2>
                    <hr />
                    <div className="form-structure">
                        <div className="form-labels">
                            <label>Denumire:</label>
                            <label>UM:</label>
                            <label>Cantitate:</label>
                            <label>Preț unitar:</label>
                        </div>
                        <div className="form-input">
                            <input className="invoice-input" type='text'
                                value={prodDescr} onChange={(e) => setProdDescr(e.target.value)} required />
                            <input className="invoice-input" type='text'
                                value={prodUM} onChange={(e) => setProdUM(e.target.value)} required />
                            <input className="invoice-input" type='number' min={0}
                                value={prodQty} onChange={(e) => updateProdQty(e.target.value)} required />
                            <input className="invoice-input" type='number' placeholder="lei" step="0.01" min={0}
                                value={prodUnitPrice} onChange={(e) => 
                                updateProdUnitPrice(e.target.value)} required />
                        </div>
                    </div>
                    <div>Valoare: {prodTotal}lei</div>
                    <br />
                    {companyTVA > 0 && <div>Valoare TVA: {prodTVA}lei</div>}
                    <br />
                    <input type='submit' value='Add' className="btn" />
                </form>
                {items.length > 0 && <ProdDisplay items={items} valTVA={companyTVA} delProd={delProd} />}
            </div>

            {!loading ? 
            <>
                    <span title="close" onClick={() => updater('main')}
                    className="btn btn-close-hide btn-left"
                >X
                </span>
                <span title="Generate"
                    style={{ position: 'fixed', bottom: '1%', right: '10px', }}
                    className="btn btn-right" onClick={updateData}
                    >Next
                </span>
            </>
            :<div id="overlay"><div className="spinner"></div></div>
            }
        </div>
    )
}

export default NewInvoice
