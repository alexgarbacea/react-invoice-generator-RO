import { useState } from "react";
import Invoice from "./Components/Invoice";

import MainMenu from "./Components/MainMenu";
import NewInvoice from "./Components/NewInvoice";

function App() {
  const [currentMenu, setCurrentMenu] = useState('main')
  const [invoiceData, setInvoiceData] = useState([]);

  const generateInvoice = (data) => {
    setInvoiceData(data);
    setCurrentMenu('invoice');
  }

  const updateCurrentMenu = newVal => {
    if (newVal !== 'main' && newVal !== 'invoice' && newVal !== 'new-invoice') 
      return alert(`"${newVal}" not available in the demo version.\nContact developer for more info.`)
    setCurrentMenu(newVal)
  }

  return (
    <div className="App">
      {currentMenu === 'main' && <MainMenu updater={updateCurrentMenu} />}
      {currentMenu === 'new-invoice' && <NewInvoice generateInvoice={generateInvoice} updater={updateCurrentMenu} />}
      {currentMenu === 'invoice' && <Invoice data={invoiceData} updater = {updateCurrentMenu} />}
    </div>
  );
}

export default App;
