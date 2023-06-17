import React from 'react'
import { Card } from 'reactstrap'
import { RemovalSettingsTabPages } from '../Constants/RemovalSettingsConstants';
import { RemovalSettingsVehicles } from '../TabPages/Vehicles';
import { VehicleGroup } from '../TabPages/VehicleGroup';
import { VehicleDailyChecklist } from '../TabPages/VehicleDailyChecklist';
import { OHSChecklist } from '../TabPages/OHSChecklist';
import { InventoryGroups } from '../TabPages/InventoryGroups';
import { InventoryDefinition } from '../TabPages/InventoryDefinition';
import { PropertyCategoryOption } from '../TabPages/PropertyCategoryOption';
import { EnableAutoQuote } from '../TabPages/EnableAutoQuote';
import { PricingSettings } from '../TabPages/PricingSettings';
import { LocalMovesHourlySettings } from '../TabPages/LocalMovesHourlySettings';
import { PricingRegions } from '../TabPages/PricingRegions';
import { RegionToRegionPricing } from '../TabPages/RegionToRegionPricing';
import { RemovalsQuoteForm } from '../TabPages/RemovalsQuoteForm';
import { Route, Routes } from 'react-router-dom';


export default function RemovalTabContent({ activeTab }) {

    const TabOutlet = () => {
        switch (activeTab) {
            case RemovalSettingsTabPages.General.Vehicles:
                return <RemovalSettingsVehicles />
            case RemovalSettingsTabPages.General.VehicleGroups:
                return <VehicleGroup />
            case RemovalSettingsTabPages.General.VehicleDailyCHecklist:
                return <VehicleDailyChecklist />
            case RemovalSettingsTabPages.General.OHSChecklist:
                return <OHSChecklist />
            case RemovalSettingsTabPages.General.InventoryGroups:
                return <InventoryGroups />
            case RemovalSettingsTabPages.General.InventoryDefinition:
                return <InventoryDefinition />
            case RemovalSettingsTabPages.General.PropertyCategoryOption:
                return <PropertyCategoryOption />


            case RemovalSettingsTabPages.AutoQuote.EnableAutoQuote:
                return <EnableAutoQuote />
            case RemovalSettingsTabPages.AutoQuote.PricingSettings:
                return <PricingSettings />
            case RemovalSettingsTabPages.AutoQuote.LocalMovesHourlySettings:
                return <LocalMovesHourlySettings />
            case RemovalSettingsTabPages.AutoQuote.PricingRegions:
                return <PricingRegions />
            case RemovalSettingsTabPages.AutoQuote.RegionToRegionPricing:
                return <RegionToRegionPricing />
            case RemovalSettingsTabPages.AutoQuote.RemovalsQuoteForm:
                return <RemovalsQuoteForm />


            case RemovalSettingsTabPages.General.Vehicles:
            default:
                return <RemovalSettingsVehicles />
        }
    }

    return (
        //Fragment just in case
       <TabOutlet/>
    )
}
