
const ProdDisplay = ({ items, valTVA, delProd }) => {
    const frmt = new Intl.NumberFormat('en-US');

    const getTotal = () => {
        let total = 0;
        items.map(item => total+= (parseFloat(item.val) + parseFloat(item.tva)))
        return frmt.format(total)
    }

    return (
        <table className="table-item-preview">
            <tbody>
                <tr>
                    <th>Nr. crt</th>
                    <th>Denumirea produselor sau a serviciilor</th>
                    <th>U.M.</th>
                    <th>Cantitate</th>
                    <th>Preț unitar</th>
                    <th>Valoare lei</th>
                    {valTVA > 0 && <th>Valoare TVA</th>}
                </tr>
                {items.map((item, i) => {
                    return (
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{item.name}</td>
                            <td>{item.um}</td>
                            <td>{frmt.format(parseFloat(item.qt))}</td>
                            <td>{frmt.format(parseFloat(item.unitPrice))}</td>
                            <td>{frmt.format(parseFloat(item.val))}</td>
                            {valTVA > 0 && <td>{frmt.format(parseFloat(item.tva))}</td>}
                            <td><span title="delete entry" onClick={() => delProd(i)}
                            style={{color:'red', fontWeight:'bolder', cursor:'pointer'}}>X</span>
                            </td>
                        </tr>
                    )
                })}
                <tr>
                    <td colSpan={5}>TOTAL:</td>
                    <td colSpan={valTVA > 0 ? 2 : 1}>{getTotal()}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default ProdDisplay
