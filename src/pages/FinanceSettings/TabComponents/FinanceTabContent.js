import React from 'react'
import { Card } from 'reactstrap'
import { FinanceSettingsTabPages } from '../Constants/FinanceSettingsConstants';
import { Products } from '../TabPages/Products';
import { Invoices } from '../TabPages/Invoices';
import { Taxes } from '../TabPages/Taxes';
import { FinanceSettingsProductCategory } from '../TabPages/ProductCategory';

export default function FinanceTabContent({ activeTab }) {

    const TabOutlet = () => {
        switch (activeTab) {
            case FinanceSettingsTabPages.ProductCategory:
                return <FinanceSettingsProductCategory />
            case FinanceSettingsTabPages.Taxes:
                return <Taxes />
            case FinanceSettingsTabPages.InvoicesSettings:
                return <Invoices />

            case FinanceSettingsTabPages.Product:
            default:
                return <Products />
        }
    }

    return (
        //Fragment just in case
        <>
            {TabOutlet()}
        </>

    )
}
