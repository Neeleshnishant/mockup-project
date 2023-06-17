import React from 'react'
import { StorageWarehouse } from '../TabPages/StorageWarehouse';
import { StorageType } from '../TabPages/StorageType';
import { StorageUnit } from '../TabPages/StorageUnit';
import { UnitsAvailability } from '../TabPages/UnitsAvailability';
import { StorageSettingsTabPages } from '../Constants/StorageSettingsConstants';
export default function StorageTabContent({ activeTab }) {

    const TabOutlet = () => {
        switch (activeTab) {
            case StorageSettingsTabPages.UnitsAvailability:
                return <UnitsAvailability />
            case StorageSettingsTabPages.StorageTypes:
                return <StorageType />
            case StorageSettingsTabPages.StorageUnits:
                return <StorageUnit />
            case StorageSettingsTabPages.StorageWarehouses:
                return <StorageWarehouse />
            default:
                return <StorageWarehouse />
        }
    }

    return (
        //Fragment just in case
        <>
            {TabOutlet()}
        </>

    )
}
